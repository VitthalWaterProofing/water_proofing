import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import sendEmail from '../utils/sendEmail';
import { reviewRequestTemplate } from '../utils/emailTemplates';

// @desc    Get all portfolio projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
  try {
    const serviceType = req.query.serviceType as string | undefined;
    const projects = await projectService.getAllProjects(serviceType);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching projects' });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.createProjectQuery(req.body);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid project data' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response) => {
  try {
    const updatedProject = await projectService.updateProjectQuery(req.params.id as string, req.body);
    res.status(200).json(updatedProject);
  } catch (error: any) {
    if (error.message === 'Project not found') {
       res.status(404).json({ message: error.message });
    } else {
       res.status(500).json({ message: 'Server Error updating project' });
    }
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response) => {
    try {
      await projectService.deleteProjectQuery(req.params.id as string);
      res.status(200).json({ message: 'Project removed' });
    } catch (error: any) {
      if (error.message === 'Project not found') {
         res.status(404).json({ message: error.message });
      } else {
         res.status(500).json({ message: 'Server Error deleting project' });
      }
    }
  };

// @desc    Send review request email to customer
// @route   POST /api/projects/:id/send-review-request
// @access  Private/Admin
export const sendReviewRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, customerName } = req.body;
    if (!email || !customerName) {
      res.status(400).json({ message: 'Email and customer name are required' });
      return;
    }

    const project = await projectService.getProjectByIdQuery(req.params.id as string);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',')[0].trim() : 'http://localhost:5173';
    // Append the project title as a query param so the form can pre-fill
    const reviewLink = `${frontendUrl}/feedback?projectName=${encodeURIComponent(project.title)}&customerName=${encodeURIComponent(customerName)}`;

    const template = reviewRequestTemplate(customerName, project.title, reviewLink);

    await sendEmail({
      email,
      subject: template.subject,
      message: 'Please leave a review',
      html: template.html,
    });

    res.status(200).json({ message: 'Review request sent successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error sending review request' });
  }
};
