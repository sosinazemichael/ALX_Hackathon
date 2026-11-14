import whisper
import os

# Load a lightweight Whisper model (e.g., 'base' or 'small') for local testing
model = whisper.load_model("base")

def transcribe_audio(file_path: str, language: str = None):
    """
    Transcribes audio file using Whisper.
    """
    options = {}
    if language:
        options["language"] = language
        
    result = model.transcribe(file_path, **options)
    return {
        "text": result["text"],
        "language": result.get("language", "unknown")
    }