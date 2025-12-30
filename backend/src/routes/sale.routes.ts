import { Router } from 'express';
import { SaleController } from '../controllers/sale.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();


router.post('/', authenticateToken, SaleController.create);


export default router;

