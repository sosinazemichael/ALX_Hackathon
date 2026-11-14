import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export const processDocumentWithAI = async (filePath, sourceLang = 'en', targetLang = 'am') => {
    if (process.env.USE_MOCK_AI === 'true') {
        return {
            extractedText: 'Welcome to NOORAA. Information should be accessible to everyone.',
            translatedText:
                targetLang === 'am'
                    ? 'ወደ NOORAA እንኳን በደህና መጡ። መረጃ ለሁሉም ሰው ተደራሽ መሆን አለበት።'
                    : 'Welcome to NOORAA. Information should be accessible to everyone.',
            audioUrl: '/uploads/audio/sample-mock.mp3',
        };
    }

    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('source_lang', sourceLang);
        form.append('target_lang', targetLang);

        const response = await axios.post(`${process.env.DOC_AI_URL}/process`, form, {
            headers: form.getHeaders(),
            timeout: 60000,
        });

        return response.data;
    } catch (error) {
        throw new Error(`Document AI service error: ${error.response?.data?.detail || error.message}`);
    }
};

export const processAudioWithAI = async (filePath, sourceLang = 'en', targetLang = 'en') => {
    if (process.env.USE_MOCK_AI === 'true') {
        return {
            transcript: 'Today we will discuss artificial intelligence and inclusive education.',
            translatedText:
                targetLang === 'am'
                    ? 'ዛሬ ስለ ሰው ሰራሽ ብልህነት እና አካታች ትምህርት እንወያያለን።'
                    : 'Today we will discuss artificial intelligence and inclusive education.',
        };
    }

    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('source_lang', sourceLang);
        form.append('target_lang', targetLang);

        const response = await axios.post(`${process.env.SPEECH_AI_URL}/transcribe`, form, {
            headers: form.getHeaders(),
            timeout: 60000,
        });

        return response.data;
    } catch (error) {
        throw new Error(`Speech AI service error: ${error.response?.data?.detail || error.message}`);
    }
};