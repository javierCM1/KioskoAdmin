import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Aquí es donde se guardan físicamente
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Evitamos colisiones de nombres usando la fecha actual + nombre original
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

// Filtro para aceptar solo imágenes (Brutalidad honesta: no queremos virus)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};

export const upload = multer({ storage, fileFilter });
