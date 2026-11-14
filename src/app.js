import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import { setupCaptionSockets } from './sockets/captionSocket.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', apiRoutes);
setupCaptionSockets(io);

app.use((err, req, res, next) => {
    console.error(err.message);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File exceeds the 25 MB limit.',
        });
    }
    res.status(err.status || 400).json({
        success: false,
        message: err.message || 'Invalid request or server error.',
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`NOORAA Backend running on http://localhost:${PORT}`);
});