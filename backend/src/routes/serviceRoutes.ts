import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.route('/').get(getServices);
router.route('/:id').get(getServiceById);

// Admin-protected routes
router.route('/').post(protect, admin, createService);
router.route('/:id')
  .put(protect, admin, updateService)
  .delete(protect, admin, deleteService);

export default router;
