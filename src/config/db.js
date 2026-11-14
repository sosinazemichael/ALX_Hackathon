import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`NOORAA MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`MongoDB not connected yet (${error.message}). Running without DB persistence.`);
    }
};