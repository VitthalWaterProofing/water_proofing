import express from 'express';
import {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.route('/').get(getTestimonials);

// Admin-protected routes
router.route('/').post(protect, admin, createTestimonial);

router.route('/admin').get(protect, admin, getAllTestimonials);

router.route('/:id')
  .put(protect, admin, updateTestimonial)
  .delete(protect, admin, deleteTestimonial);

export default router;
