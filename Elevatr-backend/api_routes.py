# File: api_router.py

import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status, Query
from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import date, timedelta

# Added imports for resume processing
import PyPDF2
import docx
import google.generativeai as genai
import io

# Import your authentication function
# Make sure auth.py is in the same directory
from auth import get_current_user

# --- Firebase Initialization ---
# This ensures Firebase is initialized only once
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-credentials.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()
# -----------------------------

# --- AI Configuration ---
# IMPORTANT: Replace with your actual key. Consider using environment variables for security.
genai.configure(api_key="AIzaSyC2_WYRatOVzcnZ0g4skNYrxvhGouJ473g") 
model = genai.GenerativeModel('gemini-1.5-flash-latest')
# ----------------------

router = APIRouter()



