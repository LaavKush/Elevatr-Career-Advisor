# routers/resources.py

import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel, HttpUrl
from typing import List
from auth import get_current_user

# AI and vector math imports
import google.generativeai as genai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# --- Firebase Initialization ---
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-credentials.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()
# -----------------------------

# --- AI Configuration ---
# IMPORTANT: Use your actual Gemini API Key from your main.py
genai.configure(api_key="AIzaSyC2_WYRatOVzcnZ0g4skNYrxvhGouJ473g")
model = genai.GenerativeModel('gemini-1.5-flash-latest')
# ----------------------

router = APIRouter()

# ==============================================================================
# --- 6. Semantic Resource Search ---
# ==============================================================================

# --- Pydantic Models ---
class SearchQuery(BaseModel):
    query: str
    top_k: int = 5 # Number of results to return

class Resource(BaseModel):
    id: str
    title: str
    description: str
    tags: List[str]
    url: HttpUrl # Use HttpUrl for URL validation

class SearchResponse(BaseModel):
    mentor_response: str
    top_resources: List[Resource]

# --- API Endpoints ---

@router.post("/search", response_model=SearchResponse, summary="Search for resources with AI")
async def search_resources(search: SearchQuery, current_user: dict = Depends(get_current_user)):
    """
    Performs a semantic search on the resources collection using embeddings
    and generates a summary response from an AI mentor.
    """
    try:
        # 1. Generate embedding for the user's query
        query_embedding_response = genai.embed_content(
            model="models/text-embedding-004",
            content=search.query,
            task_type="RETRIEVAL_QUERY"
        )
        query_embedding = query_embedding_response['embedding']

        # 2. Fetch all resources from Firestore
        # NOTE: For large datasets, this is inefficient. You would ideally use a
        # dedicated vector database or Firestore's upcoming vector search feature.
        resources_stream = db.collection("resources").stream()
        
        all_resources = []
        for doc in resources_stream:
            data = doc.to_dict()
            data['id'] = doc.id
            # Ensure the document has a pre-computed embedding
            if 'embedding' in data and data['embedding']:
                all_resources.append(data)

        if not all_resources:
            raise HTTPException(status_code=404, detail="No resources with embeddings found in the database.")

        # 3. Calculate cosine similarity and find the top_k results
        doc_embeddings = np.array([res['embedding'] for res in all_resources])
        similarities = cosine_similarity([query_embedding], doc_embeddings)[0]
        
        # Get indices of top_k highest scores
        top_indices = np.argsort(similarities)[-search.top_k:][::-1]
        
        top_results = [all_resources[i] for i in top_indices]

        # 4. Generate a summary using Gemini (RAG pattern)
        context_for_llm = "\n---\n".join(
            [f"Title: {res['title']}\nDescription: {res['description']}" for res in top_results]
        )

        prompt = f"""
        You are an AI Mentor. A user is asking for resources about "{search.query}".
        Based on the following retrieved resources, provide a helpful summary and guide them on what to look at.
        Speak directly to the user in a friendly and encouraging tone.

        Retrieved Resources:
        {context_for_llm}

        Your Response:
        """

        mentor_response = model.generate_content(prompt)
        
        return {
            "mentor_response": mentor_response.text,
            "top_resources": top_results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

'''
### Important Notes for This File

1.  **New Dependencies**: This code requires two new Python libraries for numerical operations and calculations. You'll need to install them:
    ```bash
    pip install numpy scikit-learn

    '''