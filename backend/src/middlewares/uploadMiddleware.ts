import multer from 'multer';
import { storage } from '../config/cloudinary';

// Initialize upload variable
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;
