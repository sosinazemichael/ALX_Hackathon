import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema(
    {
        userId: { type: String, default: 'guest', unique: true },
        preferredLanguage: { type: String, enum: ['am', 'en'], default: 'am' },
        speechRate: { type: Number, min: 0.5, max: 2.0, default: 1.0 },
        fontSize: { type: String, enum: ['normal', 'large', 'extra-large'], default: 'large' },
        highContrast: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);