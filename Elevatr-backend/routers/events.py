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
# --- 4. Events / Calendar (Updated) ---
# ==============================================================================

class ReminderItem(BaseModel):
    reminder_title: str
    reminder_date: date
    reminder_type: str

class EventCreate(BaseModel):
    title: str
    main_event_type: str
    main_date: date
    description: Optional[str] = None
    reminders: List[ReminderItem] = []

@router.post("/", summary="Create a new personal event for the user")
def create_personal_event(event_data: EventCreate, current_user: dict = Depends(get_current_user)):
    """
    Creates a new event for the user in the 'events' collection.
    By default, events are created as private (is_public = False).
    """
    user_uid = current_user["uid"]
    
    new_event = event_data.dict()
    new_event["owner_uid"] = user_uid
    new_event["is_public"] = False

    # Convert date objects to ISO format strings for Firestore compatibility.
    new_event["main_date"] = new_event["main_date"].isoformat()
    for reminder in new_event["reminders"]:
        reminder["reminder_date"] = reminder["reminder_date"].isoformat()

    try:
        # .add() automatically generates a document ID.
        _timestamp, event_ref = db.collection("events").add(new_event)
        return {"status": "success", "event_id": event_ref.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", summary="Get all public events AND the user's personal events")
def get_all_user_and_public_events(
    current_user: dict = Depends(get_current_user), 
    event_type: Optional[str] = Query(None, description="Filter events by type (e.g., 'hackathon', 'internship')")
):
    """
    Fetches a combined list of all public events and all events created
    by the currently authenticated user. Can be filtered by main_event_type.
    """
    user_uid = current_user["uid"]
    all_events = {} # Use a dictionary to avoid duplicates from public/private queries.

    try:
        # --- Query for public events ---
        public_events_query = db.collection("events").where("is_public", "==", True)
        if event_type:
            public_events_query = public_events_query.where("main_event_type", "==", event_type)
        
        for doc in public_events_query.stream():
            all_events[doc.id] = {"id": doc.id, **doc.to_dict()}
            
        # --- Query for the user's private events ---
        private_events_query = db.collection("events").where("owner_uid", "==", user_uid)
        if event_type:
            # NOTE: This compound query requires a Firestore index. 
            # Firestore will provide a link in the error message to create it automatically.
            private_events_query = private_events_query.where("main_event_type", "==", event_type)

        for doc in private_events_query.stream():
            all_events[doc.id] = {"id": doc.id, **doc.to_dict()}
        
        # Return the combined list of unique events, sorted by main_date
        sorted_events = sorted(list(all_events.values()), key=lambda x: x['main_date'])
        return sorted_events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{event_id}", summary="Update a personal event")
def update_personal_event(event_id: str, event_data: EventCreate, current_user: dict = Depends(get_current_user)):
    """
    Updates an event, but only if the current user is the owner.
    """
    user_uid = current_user["uid"]
    event_ref = db.collection("events").document(event_id)
    
    try:
        event_doc = event_ref.get()

        if not event_doc.exists:
            raise HTTPException(status_code=404, detail="Event not found")

        event_dict = event_doc.to_dict()
        if event_dict.get("owner_uid") != user_uid:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this event")

        # Prepare update data, converting dates to strings.
        update_data = event_data.dict(exclude_unset=True)
        if 'main_date' in update_data:
            update_data["main_date"] = update_data["main_date"].isoformat()
        if 'reminders' in update_data:
            for reminder in update_data["reminders"]:
                reminder["reminder_date"] = reminder["reminder_date"].isoformat()

        event_ref.update(update_data)
        return {"status": "success", "message": "Event updated"}
    except Exception as e:
        # Re-raise HTTPException to ensure FastAPI handles it correctly
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{event_id}", summary="Delete a personal event")
def delete_personal_event(event_id: str, current_user: dict = Depends(get_current_user)):
    """
    Deletes an event, but only if the current user is the owner.
    """
    user_uid = current_user["uid"]
    event_ref = db.collection("events").document(event_id)

    try:
        event_doc = event_ref.get()

        if not event_doc.exists:
            raise HTTPException(status_code=404, detail="Event not found")

        event_dict = event_doc.to_dict()
        if event_dict.get("owner_uid") != user_uid:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this event")
            
        event_ref.delete()
        return {"status": "success", "message": "Event deleted"}
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))