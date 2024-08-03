import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import fileRoute from './routes/fileRoute.js';
config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1", fileRoute);

export default app;
