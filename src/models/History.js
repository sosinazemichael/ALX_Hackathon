import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['document-to-speech', 'speech-to-text'],
            required: true,
        },
        sourceLang: { type: String, default: 'en' },
        targetLang: { type: String, default: 'am' },
        originalFileName: { type: String },
        extractedOrSpokenText: { type: String, required: true },
        translatedText: { type: String },
        audioUrl: { type: String },
    },
    { timestamps: true }
);

export const History = mongoose.model('History', historySchema);