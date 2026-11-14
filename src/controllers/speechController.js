import fs from 'fs';
import mongoose from 'mongoose';
import { processAudioWithAI } from '../services/aiService.js';
import { History } from '../models/History.js';

const SUPPORTED_LANGS = ['am', 'en', 'om'];

export const handleAudioUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an audio file.' });
        }

        const { targetLang = 'en', sourceLang = 'en' } = req.body;
        if (!SUPPORTED_LANGS.includes(targetLang) || !SUPPORTED_LANGS.includes(sourceLang)) {
            fs.unlink(req.file.path, () => { });
            return res.status(400).json({
                success: false,
                message: `Unsupported language. Supported languages: ${SUPPORTED_LANGS.join(', ')}`,
            });
        }

        const aiResult = await processAudioWithAI(req.file.path, sourceLang, targetLang);

        if (mongoose.connection.readyState === 1) {
            await History.create({
                type: 'speech-to-text',
                sourceLang,
                targetLang,
                originalFileName: req.file.originalname,
                extractedOrSpokenText: aiResult.transcript,
                translatedText: aiResult.translatedText,
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

export const getHistory = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({ success: true, data: [] });
        }
        const records = await History.find().sort({ createdAt: -1 }).limit(20);
        return res.status(200).json({ success: true, data: records });
    } catch (error) {
        next(error);
    }
};