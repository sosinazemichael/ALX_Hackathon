from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import asyncio

from services.ocr_service import extract_text
from services.trans_service import translate_text
from services.tts_service import generate_tts_audio

app = FastAPI(
    title="Nooraa Document AI Service",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/api/v1/process-document")
async def process_document(
    file: UploadFile = File(...),
    target_language: str = Form("amh_Eth")
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        extracted_text = await asyncio.to_thread(extract_text, file_path)
        if not extracted_text:
            raise HTTPException(status_code=400, detail="No text could be extracted.")

        source_lang = "eng_Latn" if target_language == "amh_Eth" else "amh_Eth"
        translated_text = await asyncio.to_thread(
            translate_text, extracted_text, target_lang=target_language, source_lang=source_lang
        )

        audio_filename = f"nooraa_audio_{os.path.splitext(file.filename)[0]}.mp3"
        audio_path = os.path.join(OUTPUT_DIR, audio_filename)
        await asyncio.to_thread(
            generate_tts_audio, translated_text, audio_path, lang=target_language
        )

        return {
            "status": "success",
            "filename": file.filename,
            "extracted_text": extracted_text,
            "translated_text": translated_text,
            "audio_url": f"/api/v1/download-audio/{audio_filename}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/download-audio/{filename}")
async def download_audio(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg", filename=filename)
    raise HTTPException(status_code=404, detail="Audio file not found.")