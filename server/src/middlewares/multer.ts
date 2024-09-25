import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const uploadsDir = path.join(__dirname, '../../uploads');  
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); 
}

declare global {
  namespace Express {
    interface Request {
      fileValidationError?: string;
    }
  }
}

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, uploadsDir);  // Set the destination to the root-level 'uploads' folder
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);  
  } else {
    cb(null, false);  
    req.fileValidationError = 'Invalid file type. Only images are allowed!';
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
