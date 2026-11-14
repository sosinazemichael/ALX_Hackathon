import os
from gtts import gTTS

def generate_tts_audio(text: str, output_path: str, lang: str = "en") -> None:
    """
    Generates free audio using gTTS. No API keys or billing required.
    """
    if not text.strip():
        text = "No text provided."

    gtts_lang = "am" if "amh" in lang.lower() or lang == "am" else "en"

    try:
        tts = gTTS(text=text, lang=gtts_lang, slow=False)
        tts.save(output_path)
    except Exception as e:
        print(f"gTTS Error: {e}")
        tts = gTTS(text=text, lang="en", slow=False)
        tts.save(output_path)