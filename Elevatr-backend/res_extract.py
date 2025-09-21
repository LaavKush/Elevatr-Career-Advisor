"""
import os.path
import io
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload
import PyPDF2
# --- Google Drive API Configuration ---
# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

def authenticate_google_drive():
#Shows basic usage of the Drive v3 API.Handles user authentication and returns the service object.
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # Make sure your 'credentials.json' file is in the same directory
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    
    return build("drive", "v3", credentials=creds)

def extract_text_from_drive_pdf(file_id, service):
    #Downloads a PDF from Google Drive and extracts its text.
    try:
        # Request to get the file's metadata
        request = service.files().get_media(fileId=file_id)
        
        # Use io.BytesIO to handle the file in memory
        file_in_memory = io.BytesIO()
        downloader = MediaIoBaseDownload(file_in_memory, request)
        
        done = False
        while not done:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}%.")

        # After download, reset the stream's position to the beginning
        file_in_memory.seek(0)

        # --- Use PyPDF2 to read the in-memory PDF ---
        pdf_reader = PyPDF2.PdfReader(file_in_memory)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        
        return text

    except HttpError as error:
        print(f"An error occurred: {error}")
        return None

# --- Main Execution ---
if __name__ == "__main__":
    # 1. Authenticate and create the service object
    drive_service = authenticate_google_drive()
    
    # 2. Replace with the actual ID of your PDF file in Google Drive
    pdf_file_id = "YOUR_PDF_FILE_ID_HERE" 
    
    # 3. Extract and print the text
    pdf_text = extract_text_from_drive_pdf(pdf_file_id, drive_service)
    
    if pdf_text:
        print("\n--- Extracted Text ---")
        print(pdf_text)
    else:
        print("Could not extract text from the PDF.")
"""