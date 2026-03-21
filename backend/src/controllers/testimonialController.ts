import { Request, Response } from 'express';
import * as testimonialService from '../services/testimonialService';

// @desc    Get approved testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialService.getApprovedTestimonials();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching testimonials' });
  }
};

// @desc    Get all testimonials (including unapproved)
// @route   GET /api/testimonials/admin
// @access  Private/Admin
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialService.getAllTestimonialsAdmin();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching all testimonials' });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public (Clients submitting reviews)
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    // Prevent malicious users from setting their own review as approved
    const payload = {
      ...req.body,
      isApproved: false
    };
    const testimonial = await testimonialService.createTestimonialQuery(payload);
    res.status(201).json(testimonial);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid testimonial data' });
  }
};

// @desc    Update a testimonial (approve/edit)
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const updatedTestimonial = await testimonialService.updateTestimonialQuery(req.params.id as string, req.body);
    res.status(200).json(updatedTestimonial);
  } catch (error: any) {
    if (error.message === 'Testimonial not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error updating testimonial' });
    }
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    await testimonialService.deleteTestimonialQuery(req.params.id as string);
    res.status(200).json({ message: 'Testimonial removed' });
  } catch (error: any) {
    if (error.message === 'Testimonial not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error deleting testimonial' });
    }
  }
};
