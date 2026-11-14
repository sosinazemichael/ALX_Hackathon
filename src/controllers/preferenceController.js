import mongoose from 'mongoose';
import { UserPreference } from '../models/UserPreference.js';

const defaultPrefs = {
    userId: 'guest',
    preferredLanguage: 'am',
    speechRate: 1.0,
    fontSize: 'large',
    highContrast: false,
};

export const getPreferences = async (req, res, next) => {
    try {
        const userId = req.query.userId || 'guest';

        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({ success: true, data: { ...defaultPrefs, userId } });
        }

        let prefs = await UserPreference.findOne({ userId });
        if (!prefs) {
            prefs = await UserPreference.create({ ...defaultPrefs, userId });
        }

        return res.status(200).json({ success: true, data: prefs });
    } catch (error) {
        next(error);
    }
};

export const updatePreferences = async (req, res, next) => {
    try {
        const { userId = 'guest', preferredLanguage, speechRate, fontSize, highContrast } = req.body;

        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({
                success: true,
                data: { userId, preferredLanguage, speechRate, fontSize, highContrast },
            });
        }

        const updated = await UserPreference.findOneAndUpdate(
            { userId },
            { preferredLanguage, speechRate, fontSize, highContrast },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};