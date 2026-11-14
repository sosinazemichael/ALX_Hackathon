import axios from 'axios';
import FormData from 'form-data';

export const setupCaptionSockets = (io) => {
    io.on('connection', (socket) => {
        console.log(`NOORAA live caption client connected: ${socket.id}`);

        socket.on('audio:chunk', async ({ audioBlob, sourceLang = 'en', targetLang = 'en', mimeType = 'audio/webm' }) => {
            try {
                if (process.env.USE_MOCK_AI === 'true') {
                    socket.emit('caption:update', {
                        transcript: 'Live microphone speech detected...',
                        translatedText:
                            targetLang === 'am' ? 'የቀጥታ ንግግር ተገኝቷል...' : 'Live microphone speech detected...',
                        isFinal: true,
                    });
                    return;
                }

                if (!audioBlob) return;

                const buffer = Buffer.isBuffer(audioBlob) ? audioBlob : Buffer.from(audioBlob);
                const form = new FormData();
                form.append('file', buffer, { filename: 'chunk.webm', contentType: mimeType });
                form.append('source_lang', sourceLang);
                form.append('target_lang', targetLang);

                const response = await axios.post(`${process.env.SPEECH_AI_URL}/transcribe`, form, {
                    headers: form.getHeaders(),
                    timeout: 15000,
                });

                socket.emit('caption:update', {
                    transcript: response.data.transcript,
                    translatedText: response.data.translatedText,
                    isFinal: true,
                });
            } catch (error) {
                socket.emit('caption:error', {
                    message: 'Failed to process live audio chunk.',
                });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};