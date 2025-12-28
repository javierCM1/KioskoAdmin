import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const productController = new ProductController();
const router = Router();    


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas Protegidas (Escritura - Requieren Token)
router.post('/', authenticateToken, productController.createProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

export default router;