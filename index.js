import express from 'express';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
