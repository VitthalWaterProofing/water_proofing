import multer from 'multer';
import { storage } from '../config/cloudinary';

// Initialize upload variable
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (Up from 5MB)
  },
});

export default upload;
