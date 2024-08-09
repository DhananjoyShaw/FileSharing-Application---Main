import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import fileRoute from './routes/fileRoute.js';
config();

const app = express();

// Middleware
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1", fileRoute);

export default app;
