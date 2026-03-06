import express, { Request, Response } from 'express';
import upload from '../middlewares/uploadMiddleware';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req: Request, res: Response) => {
  if (req.file) {
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path, // Cloudinary URL
    });
  } else {
    res.status(400).json({ message: 'No image file provided' });
  }
});

export default router;
