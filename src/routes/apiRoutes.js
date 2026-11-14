import express from 'express';
import { uploadDocument, uploadAudio } from '../middlewares/upload.js';
import { handleDocumentUpload } from '../controllers/documentController.js';
import { handleAudioUpload, getHistory } from '../controllers/speechController.js';
import { getPreferences, updatePreferences } from '../controllers/preferenceController.js';

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'NOORAA Backend' });
});

// Core Accessibility Processing
router.post('/documents/process', uploadDocument.single('file'), handleDocumentUpload);
router.post('/speech/transcribe', uploadAudio.single('file'), handleAudioUpload);

// MongoDB Persistence (History & Accessibility Settings)
router.get('/history', getHistory);
router.get('/preferences', getPreferences);
router.post('/preferences', updatePreferences);

export default router;