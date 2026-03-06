import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';

// @desc    Get all active services
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getActiveServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching services' });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.getServiceByIdQuery(req.params.id as string);

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching service details' });
  }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req: Request, res: Response) => {
  try {
    const createdService = await serviceService.createServiceQuery(req.body);
    res.status(201).json(createdService);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid service data' });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req: Request, res: Response) => {
  try {
    const updatedService = await serviceService.updateServiceQuery(req.params.id as string, req.body);
    res.status(200).json(updatedService);
  } catch (error: any) {
    if (error.message === 'Service not found') {
       res.status(404).json({ message: error.message });
    } else {
       res.status(500).json({ message: 'Server Error updating service' });
    }
  }
};

// @desc    Delete/Deactivate a service (Soft Delete recommended, but showing Hard Delete)
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req: Request, res: Response) => {
  try {
    await serviceService.deleteServiceQuery(req.params.id as string);
    res.status(200).json({ message: 'Service removed' });
  } catch (error: any) {
    if (error.message === 'Service not found') {
       res.status(404).json({ message: error.message });
    } else {
       res.status(500).json({ message: 'Server Error deleting service' });
    }
  }
};
