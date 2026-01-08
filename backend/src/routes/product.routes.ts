import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import { ProductController } from '../controllers/product.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const productController = new ProductController();
const router = Router();    

// Rutas Públicas (Lectura): El cliente o el vendedor pueden ver el inventario
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas Privadas (Escritura): Solo personal autorizado con Token
router.post('/', authenticateToken, upload.single('image'), productController.createProduct);
router.put('/:id', authenticateToken, upload.single('image'), productController.updateProduct); // Agregué upload aquí por si quieres cambiar la imagen al editar
router.delete('/:id', authenticateToken, productController.deleteProduct);

export default router;