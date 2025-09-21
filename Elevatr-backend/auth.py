import firebase_admin
from firebase_admin import auth
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# This tells FastAPI where the client will send the token.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Validates the Firebase ID token and returns the user's UID.
    """
    try:
        # Verify the token sent from the frontend
        decoded_token = auth.verify_id_token(token)
        # Extract the user's unique ID (UID)
        uid = decoded_token['uid']
        return {"uid": uid}
    except Exception as e:
        # If the token is invalid, raise a 401 Unauthorized error
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )