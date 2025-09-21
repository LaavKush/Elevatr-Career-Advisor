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
router = APIRouter()
# ==============================================================================
# --- 2. Checklist & Progress Tracker ---
# ==============================================================================
class TaskBase(BaseModel):
    """Base model with common task attributes."""
    title: str
    category: str
    deadline: Optional[date] = None
    priority: str = "Medium"

class TaskIn(TaskBase):
    """Model for creating a new task."""
    completed: bool = False

class TaskUpdate(BaseModel):
    """Model for partially updating a task. All fields are optional."""
    title: Optional[str] = None
    category: Optional[str] = None
    deadline: Optional[date] = None
    priority: Optional[str] = None
    completed: Optional[bool] = None

class TaskOut(TaskIn):
    """Model for returning a task to the client, includes the ID."""
    id: str


# ## API Endpoints ##

@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED, summary="Create a new task")
def create_task(task: TaskIn, current_user: dict = Depends(get_current_user)):
    """
    Creates a new task in the top-level 'tasks' collection for the user.
    """
    user_uid = current_user["uid"]
    try:
        new_task_data = task.dict()
        new_task_data["owner_uid"] = user_uid
        
        # Convert date to string for Firestore, if it exists
        if new_task_data.get("deadline"):
            new_task_data["deadline"] = new_task_data["deadline"].isoformat()
            
        _timestamp, task_ref = db.collection("tasks").add(new_task_data)
        
        # Fetch the newly created document to return it
        created_task_doc = task_ref.get()
        response_data = created_task_doc.to_dict()
        response_data["id"] = created_task_doc.id
        
        return response_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

@router.get("/", response_model=List[TaskOut], summary="Get all of user's tasks")
def get_all_tasks(current_user: dict = Depends(get_current_user)):
    """
    Retrieves all tasks owned by the currently authenticated user.
    """
    user_uid = current_user["uid"]
    try:
        tasks_query = db.collection("tasks").where("owner_uid", "==", user_uid).stream()
        tasks = []
        for doc in tasks_query:
            task_data = doc.to_dict()
            task_data["id"] = doc.id
            
            # **FIX:** Convert deadline string from Firestore back to a date object
            if task_data.get("deadline"):
                task_data["deadline"] = date.fromisoformat(task_data["deadline"])

            tasks.append(task_data)
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

@router.patch("/{task_id}", response_model=TaskOut, summary="Partially update a task")
def update_task(task_id: str, task_update: TaskUpdate, current_user: dict = Depends(get_current_user)):
    """
    Updates a task's fields. Only sends the fields that need updating.
    Checks for ownership before updating.
    """
    user_uid = current_user["uid"]
    task_ref = db.collection("tasks").document(task_id)
    
    try:
        task_doc = task_ref.get()
        if not task_doc.exists:
            raise HTTPException(status_code=404, detail="Task not found")
        
        if task_doc.to_dict().get("owner_uid") != user_uid:
            raise HTTPException(status_code=403, detail="Not authorized to update this task")
        
        # **IMPROVEMENT:** Use exclude_unset=True for partial updates
        update_data = task_update.dict(exclude_unset=True)
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No update data provided")

        if "deadline" in update_data and update_data["deadline"] is not None:
            update_data["deadline"] = update_data["deadline"].isoformat()

        task_ref.update(update_data)
        
        # Fetch and return the updated document
        updated_doc = task_ref.get().to_dict()
        updated_doc["id"] = task_ref.id
        if updated_doc.get("deadline"):
             updated_doc["deadline"] = date.fromisoformat(updated_doc["deadline"])
        return updated_doc

    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a task")
def delete_task(task_id: str, current_user: dict = Depends(get_current_user)):
    """
    Deletes a task, but only if the current user is the owner.
    Returns 204 No Content on successful deletion.
    """
    user_uid = current_user["uid"]
    task_ref = db.collection("tasks").document(task_id)
    try:
        task_doc = task_ref.get()
        if not task_doc.exists:
            raise HTTPException(status_code=404, detail="Task not found")

        if task_doc.to_dict().get("owner_uid") != user_uid:
            raise HTTPException(status_code=403, detail="Not authorized to delete this task")

        task_ref.delete()
        # Return None, FastAPI will handle the 204 response
        return None
    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=str(e))