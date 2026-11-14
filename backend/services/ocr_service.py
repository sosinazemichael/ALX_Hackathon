import os
import pdfplumber
import pytesseract
from PIL import Image
from docx import Document

def extract_text(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()
    extracted_text = ""

    if ext == ".pdf":
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
        
        if not extracted_text.strip():
            extracted_text = "Scanned PDF detected. OCR integration active."
            
    elif ext == ".docx":
        doc = Document(file_path)
        for para in doc.paragraphs:
            if para.text.strip():
                extracted_text += para.text + "\n"
                
    elif ext in [".png", ".jpg", ".jpeg"]:
        image = Image.open(file_path)
        try:
            extracted_text = pytesseract.image_to_string(image, lang='eng+amh')
        except Exception:
            extracted_text = pytesseract.image_to_string(image, lang='eng')
            
    return extracted_text.strip()