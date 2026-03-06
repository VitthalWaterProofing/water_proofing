import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getProjects) // Public
  .post(protect, admin, createProject); // Admin

router.route('/:id')
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router;
