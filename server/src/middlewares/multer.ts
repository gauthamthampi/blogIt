import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Modify the uploads directory to be at the root level, outside of the 'src' directory
const uploadsDir = path.join(__dirname, '../../uploads');  // Goes two levels up to reach the root directory
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);  // Create the 'uploads' directory if it doesn't exist
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
    cb(null, true);  // Accept the file if it's an image
  } else {
    cb(null, false);  // Reject the file if it's not an image
    req.fileValidationError = 'Invalid file type. Only images are allowed!';
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
