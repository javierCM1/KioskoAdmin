import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {prisma} from './config/db'; 
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import saleRoutes from './routes/sale.routes';
import path from 'path';

dotenv.config();

const app: Application = express();
const PORT = 3000;


app.use(cors()); 
app.use(express.json());


app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', database: 'Disconnected' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.listen(PORT, () => {
  console.log(`🚀 Kiosk-Manager API corriendo en: http://localhost:${PORT}`);
});