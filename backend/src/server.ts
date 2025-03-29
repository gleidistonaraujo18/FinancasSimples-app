import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import baseRoutes from './routes/baseRoutes';
import financeRoutes from './routes/financeRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/finance', financeRoutes)
app.use('/api/', baseRoutes)

export default app; 