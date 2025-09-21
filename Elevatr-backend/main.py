import firebase_admin
from firebase_admin import credentials
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- Project Routers ---
# Import the router objects from your "routers" directory.
# Each of these files (e.g., profile.py) will contain its own APIRouter.
from routers import tasks, profile, learning, events, mentor, resources

# --- Firebase Initialization ---
# This check ensures that Firebase is only initialized once, preventing errors.
# It's a robust way to handle app startup in various environments.
if not firebase_admin._apps:
    # It's recommended to use an environment variable for the path in production
    # for better security and flexibility.
    # Example: cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
    cred = credentials.Certificate("firebase-credentials.json")
    firebase_admin.initialize_app(cred)
# -----------------------------


# --- FastAPI App Initialization ---
# Create the main FastAPI application instance.
# You can add metadata here that will be displayed in the API docs.
app = FastAPI(
    title="Elevatr API",
    description="API for the Elevatr platform, providing resources for learning and mentorship.",
    version="1.0.0",
)
# --------------------------------


# --- CORS (Cross-Origin Resource Sharing) Middleware ---
# This allows your frontend (e.g., running on localhost:5173) to communicate
# with this backend API.
origins = [
    "http://localhost",
    "http://localhost:5173",  # For Vite/React/Vue development servers
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Using a wildcard for development to ensure connectivity.
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# ----------------------------------------------------


# --- API Router Inclusion ---
# Connect all your endpoint modules to the main application.
# - `prefix` adds a URL path prefix to all endpoints in that router.
# - `tags` groups the endpoints neatly in the interactive API documentation.
app.include_router(profile.router, prefix="/profile", tags=["Profile"])
app.include_router(learning.router, prefix="/learning", tags=["Learning Tools"])
app.include_router(events.router, prefix="/events", tags=["Events"])
app.include_router(mentor.router, prefix="/mentor", tags=["AI Mentor"])
app.include_router(resources.router, prefix="/resources", tags=["Resources"])
app.include_router(tasks.router,prefix="/tasks", tags=["Tasks"])
# --------------------------


# --- Root Endpoint ---
# A simple endpoint to confirm that the API is running.
@app.get("/", tags=["Root"])
def read_root():
    """
    Welcome endpoint for the API.
    """
    return {"message": "Welcome to the Elevatr API!"}
# ---------------------
