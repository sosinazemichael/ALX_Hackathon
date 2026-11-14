import fs from 'fs';
import mongoose from 'mongoose';
import { processDocumentWithAI } from '../services/aiService.js';
import { History } from '../models/History.js';

const SUPPORTED_LANGS = ['am', 'en', 'om'];

export const handleDocumentUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a PDF or image file.' });
        }

        const { targetLang = 'am', sourceLang = 'en' } = req.body;
        if (!SUPPORTED_LANGS.includes(targetLang) || !SUPPORTED_LANGS.includes(sourceLang)) {
            fs.unlink(req.file.path, () => { });
            return res.status(400).json({
                success: false,
                message: `Unsupported language. Supported languages: ${SUPPORTED_LANGS.join(', ')}`,
            });
        }

        const aiResult = await processDocumentWithAI(req.file.path, sourceLang, targetLang);

        if (mongoose.connection.readyState === 1) {
            await History.create({
                type: 'document-to-speech',
                sourceLang,
                targetLang,
                originalFileName: req.file.originalname,
                extractedOrSpokenText: aiResult.extractedText,
                translatedText: aiResult.translatedText,
                audioUrl: aiResult.audioUrl,
            });
        }

        fs.unlink(req.file.path, () => { });

        return res.status(200).json({
            success: true,
            data: aiResult,
        });
    } catch (error) {
        if (req.file) fs.unlink(req.file.path, () => { });
        next(error);
    }
};