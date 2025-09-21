# In profile.py, learning.py, events.py, and mentor.py

import io
import PyPDF2
import docx
import json
from datetime import datetime, timezone

import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status, Query
from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import date, timedelta

# Import your authentication function
from auth import get_current_user

# --- Firebase & AI Setup ---
# You can keep the initialization here, the "if not firebase_admin._apps" check
# will prevent it from running more than once.
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-credentials.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

import google.generativeai as genai
# Consider loading the key from environment variables
genai.configure(api_key="AIzaSyC2_WYRatOVzcnZ0g4skNYrxvhGouJ473g") 
model = genai.GenerativeModel('gemini-1.5-flash-latest')
# --- End of Setup ---

router = APIRouter()
# ==============================================================================
# --- 5. AI Mentor ---
# ==============================================================================

class MentorQuestion(BaseModel):
    question: str

@router.post("/resume", summary="Upload and process a resume")
async def process_resume_for_mentor(current_user: dict = Depends(get_current_user), file: UploadFile = File(...)):
    """
    Uploads a resume (PDF or DOCX), extracts text, generates a summary using AI,
    and stores the summary in the user's profile document.
    """
    user_uid = current_user["uid"]
    file_content = await file.read()
    text = ""
    file_stream = io.BytesIO(file_content)
    
    # --- File Parsing ---
    if file.content_type == 'application/pdf':
        try:
            reader = PyPDF2.PdfReader(file_stream)
            for page in reader.pages:
                text += page.extract_text() or ""
        except Exception:
            raise HTTPException(status_code=400, detail="Could not read the PDF file.")
    elif file.content_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        try:
            doc = docx.Document(file_stream)
            for para in doc.paragraphs:
                text += para.text + "\n"
        except Exception:
            raise HTTPException(status_code=400, detail="Could not read the DOCX file.")
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PDF or DOCX.")

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from the document.")

    # --- AI Prompt for Summary ---
    prompt = f"""
    Based on the following resume text, please provide a concise summary in a clean JSON format.
    The JSON should have three keys: 'key_skills' (a list of important technical and soft skills),
    'experience_summary' (a 2-3 sentence summary of professional experience), and
    'project_highlights' (a brief summary of key projects).

    Resume Text:
    ---
    {text}
    ---
    """
    
    try:
        response = model.generate_content(prompt)
        summary_text = response.text.strip().replace("```json", "").replace("```", "")
        summary_json = json.loads(summary_text) # Validate that the output is valid JSON
        
        # --- Database Update ---
        db.collection("users").document(user_uid).update({"resume_summary": summary_json})
        
        return {"status": "success", "summary": summary_json}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned an invalid summary format.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An AI or Database error occurred: {e}")

@router.post("/ask", summary="Ask the AI mentor a question")
def ask_mentor(question: MentorQuestion, current_user: dict = Depends(get_current_user)):
    """
    Asks the AI mentor a question. The AI uses the user's profile and resume summary
    for context and saves the conversation to the user's mentor history.
    """
    user_uid = current_user["uid"]
    
    try:
        profile_doc = db.collection("users").document(user_uid).get()
        if not profile_doc.exists:
            raise HTTPException(status_code=404, detail="User profile not found. Please create one first.")
        
        profile_data = profile_doc.to_dict()
        
        # --- AI Prompt for Mentorship ---
        prompt = f"""
        You are an expert career and skills mentor. A user needs your guidance.
        
        Here is the user's profile:
        - Name: {profile_data.get('name', 'N/A')}
        - Stated Skills: {', '.join(profile_data.get('skills', []))}
        - Stated Interests: {', '.join(profile_data.get('interests', []))}
        - Resume Summary: {json.dumps(profile_data.get('resume_summary', 'No resume summary available.'))}

        Based on their profile, answer the following question concisely and helpfully.
        Provide actionable advice, suggest resources, or create a simple plan if applicable.
        
        User's Question: "{question.question}"
        
        Your Answer:
        """
        
        response = model.generate_content(prompt)
        answer = response.text
        
        # --- Save to History ---
        history_entry = {
            "owner_uid": user_uid,
            "question": question.question,
            "answer": answer,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        db.collection("mentor_history").add(history_entry)
        
        return {"question": question.question, "answer": answer}
    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

@router.get("/history", summary="Get the user's AI mentor conversation history")
def get_mentor_history(current_user: dict = Depends(get_current_user)):
    """
    Retrieves the full conversation history for the currently authenticated user.
    """
    user_uid = current_user["uid"]
    try:
        history_query = db.collection("mentor_history").where("owner_uid", "==", user_uid).order_by("timestamp").stream()
        history = [{"id": doc.id, **doc.to_dict()} for doc in history_query]
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
