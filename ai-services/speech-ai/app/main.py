from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import speech_routes, stream_routes

app = FastAPI(title="AccessBridge Speech AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(speech_routes.router, prefix="/api/speech", tags=["Speech AI"])
app.include_router(stream_routes.router, prefix="/api/speech", tags=["Speech AI Stream"])

@app.get("/")
def health_check():
    return {"status": "online", "service": "speech-ai"}