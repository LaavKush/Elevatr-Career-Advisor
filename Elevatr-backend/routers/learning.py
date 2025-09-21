# In profile.py, learning.py, events.py, and mentor.py

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
# --- 3. Flashcards (Spaced Repetition) ---
# ==============================================================================

class Flashcard(BaseModel):
    question: str
    answer: str
    deck: str 
    next_review_date: date = date.today()
    interval: int = 1

class FlashcardReview(BaseModel):
    performance_rating: int = Query(..., ge=1, le=5)

@router.post("/flashcards", status_code=status.HTTP_201_CREATED, summary="Create a new flashcard")
def create_flashcard(flashcard: Flashcard, current_user: dict = Depends(get_current_user)):
    """
    Creates a new flashcard in the top-level 'flashcards' collection.
    """
    user_uid = current_user["uid"]
    try:
        new_flashcard = flashcard.dict()
        new_flashcard["owner_uid"] = user_uid
        new_flashcard["next_review_date"] = new_flashcard["next_review_date"].isoformat()
        _timestamp, flashcard_ref = db.collection("flashcards").add(new_flashcard)
        return {"status": "success", "flashcard_id": flashcard_ref.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/flashcards/due", summary="Get all flashcards due for review")
def get_due_flashcards(current_user: dict = Depends(get_current_user)):
    """
    Retrieves all flashcards for a user that are due for review today.
    """
    user_uid = current_user["uid"]
    today_str = date.today().isoformat()
    try:
        # NOTE: This compound query requires a Firestore index.
        # Firestore will provide a link in the error message to create it.
        due_cards_query = db.collection("flashcards").where("owner_uid", "==", user_uid).where("next_review_date", "<=", today_str).stream()
        due_cards = [{"id": doc.id, **doc.to_dict()} for doc in due_cards_query]
        return due_cards
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/flashcards/{flashcard_id}/review", summary="Review a flashcard and update its next review date")
def review_flashcard(flashcard_id: str, review: FlashcardReview, current_user: dict = Depends(get_current_user)):
    """
    Updates a flashcard's review interval and date based on performance.
    Only the owner of the flashcard can perform this action.
    """
    user_uid = current_user["uid"]
    card_ref = db.collection("flashcards").document(flashcard_id)
    try:
        card_doc = card_ref.get()
        if not card_doc.exists:
            raise HTTPException(status_code=404, detail="Flashcard not found")

        card_data = card_doc.to_dict()
        if card_data.get("owner_uid") != user_uid:
            raise HTTPException(status_code=403, detail="Not authorized to review this flashcard")

        current_interval = card_data.get("interval", 1)

        # Simple spaced repetition algorithm
        if review.performance_rating < 3:
            new_interval = 1 # Reset if recall was poor
        else:
            new_interval = current_interval * 2 # Double the interval if recall was good

        new_review_date = date.today() + timedelta(days=new_interval)

        card_ref.update({
            "interval": new_interval,
            "next_review_date": new_review_date.isoformat()
        })
        return {"status": "success", "message": f"Next review in {new_interval} day(s)."}
    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=str(e))
