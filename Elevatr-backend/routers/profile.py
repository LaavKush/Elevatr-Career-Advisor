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
# --- 1. Profile Feature ---
# ==============================================================================

class UserProfile(BaseModel):
    name: str
    email: EmailStr
    college: str
    cgpa: float
    skills: List[str]
    interests: List[str]


@router.post("/", summary="Create a user profile")
def create_user_profile(profile: UserProfile, current_user: dict = Depends(get_current_user)):
    user_uid = current_user["uid"]
    db.collection("users").document(user_uid).set(profile.dict())
    return {"status": "success", "uid": user_uid}

@router.get("/", summary="Get the current user's profile")
def get_user_profile(current_user: dict = Depends(get_current_user)):
    user_uid = current_user["uid"]
    profile_doc = db.collection("users").document(user_uid).get()
    if not profile_doc.exists:
        raise HTTPException(status_code=404, detail="User profile not found")
    return profile_doc.to_dict()

@router.put("/", summary="Update the current user's profile")
def update_user_profile(profile: UserProfile, current_user: dict = Depends(get_current_user)):
    user_uid = current_user["uid"]
    db.collection("users").document(user_uid).update(profile.dict())
    return {"status": "success", "message": "Profile updated"}