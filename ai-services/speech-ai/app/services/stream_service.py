import whisper
import numpy as np
import io
import torch

# Load model (reusing the same base model)
model = whisper.load_model("base")

def process_audio_chunk(audio_bytes: bytes, language: str = None) -> str:
    """
    Processes a raw audio chunk (e.g., WebM/Wav bytes) from a WebSocket stream.
    """
    try:
        # Convert raw bytes to a file-like object for Whisper
        audio_file = io.BytesIO(audio_bytes)
        
        # Load audio using torch/numpy or let whisper handle the stream buffer
        # For simplicity in chunked streaming, we save to a temporary buffer or read via numpy if PCM
        # Here we can write temporary chunks or use whisper's audio loader
        import tempfile, os
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp:
            temp.write(audio_bytes)
            temp_name = temp.name

        options = {"fp16": False}
        if language and language != "auto":
            options["language"] = language

        result = model.transcribe(temp_name, **options)
        os.unlink(temp_name)
        
        return result["text"].strip()
    except Exception as e:
        print(f"Streaming error: {e}")
        return ""