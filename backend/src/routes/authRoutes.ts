import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../controllers/authController';
import { protect, admin } from '../middlewares/authMiddleware';

// Input validation helper
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required'),
    validateRequest,
  ],
  authUser
);

router.post(
  '/register',
  protect,
  admin,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validateRequest,
  ],
  registerUser
); // Only super_admins or staff can create another staff/admin
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);

export default router;
