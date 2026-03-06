import express from 'express';
import {
  submitLead,
  getLeads,
  updateLeadStatus,
} from '../controllers/leadController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(submitLead) // Public
  .get(protect, admin, getLeads); // Admin

router.route('/:id/status').put(protect, admin, updateLeadStatus);

export default router;
