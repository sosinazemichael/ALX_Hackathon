from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.stream_service import process_audio_chunk
from app.services.translation_service import translate_text

router = APIRouter()

@router.websocket("/ws/stream-captions")
async def websocket_caption_endpoint(websocket: WebSocket, target_language: str = "en"):
    await websocket.accept()
    print("WebSocket client connected for live captions.")
    
    try:
        while True:
            # Receive audio chunk bytes from the client
            data = await websocket.receive_bytes()
            
            if not data:
                continue

            # Transcribe the incoming chunk
            transcribed_text = process_audio_chunk(data)
            
            if transcribed_text:
                output_text = transcribed_text
                # Translate if a target language is specified (e.g., Amharic)
                if target_language and target_language != "en":
                    output_text = translate_text(transcribed_text, "en", target_language)

                # Send live caption back to client
                await websocket.send_json({
                    "original": transcribed_text,
                    "translated": output_text,
                    "target_language": target_language
                })
            
    except WebSocketDisconnect:
        print("WebSocket client disconnected.")
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()