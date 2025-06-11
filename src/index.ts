import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoutes';
import newsletterRoutes from './routes/newsletterRoutes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/newsletters', newsletterRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));