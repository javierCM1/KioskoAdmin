import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller'; 

const authController = new AuthController();
const router = Router();


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

export default router;