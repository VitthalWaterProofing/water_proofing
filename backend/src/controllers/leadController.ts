import { Request, Response } from 'express';
import * as leadService from '../services/leadService';

// @desc    Submit a new lead/inquiry
// @route   POST /api/leads
// @access  Public
export const submitLead = async (req: Request, res: Response) => {
  try {
    const { customerName, email, phone, serviceRequested, message } = req.body;
    
    // Defer processing logic to service layer
    const lead = await leadService.submitLeadQuery(customerName, email, phone, serviceRequested, message);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: lead,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid lead data' });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await leadService.getAllLeads();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching leads' });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id/status
// @access  Private/Admin
export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedLead = await leadService.updateLeadStatusQuery(req.params.id as string, status);
    res.status(200).json(updatedLead);
  } catch (error: any) {
    if (error.message === 'Invalid status' || error.message === 'Lead not found') {
       res.status(400).json({ message: error.message });
    } else {
       res.status(500).json({ message: 'Server Error updating lead status' });
    }
  }
};
