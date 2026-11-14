def translate_text(text: str, target_lang: str = "amh_Eth", source_lang: str = "eng_Latn") -> str:
    """
    Simulates or returns the text for Nooraa's demo. 
    """
    if not text.strip():
        return ""
    
    # For hackathon demo reliability:
    if target_lang == "amh_Eth":
        # If the text is already in Amharic, return it directly so TTS reads it smoothly
        # Or return clean text without heavy bracketed English tags if reading aloud
        return text
    
    return text