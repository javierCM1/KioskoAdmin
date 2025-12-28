import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_para_dev_123');
    (req as any).user = decoded; // Guardamos los datos del usuario en la petición
    next(); // ¡Pasa el guardia!
  } catch (error) {
    res.status(403).json({ message: 'Token no válido o expirado.' });
  }
};