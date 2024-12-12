import express from 'express';
import appRouter from '../routes/users';
import authRouterApp from '../routes/auth';
import cors from 'cors';
import { authenticateJWT } from "../middleware/auth";
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

// Middleware for JSON parsing and CORS
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:58792',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));
// Routes
app.use('/api/users', authenticateJWT, appRouter);
app.use('/api/auth', authRouterApp);

// Exporting as a Vercel serverless function
export default function handler(req: VercelRequest, res: VercelResponse) {
    app(req, res);
}
