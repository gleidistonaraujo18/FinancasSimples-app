import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import baseRoutes from './routes/baseRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/', baseRoutes)
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


export default app; 