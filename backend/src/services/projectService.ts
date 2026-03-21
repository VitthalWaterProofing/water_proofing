import Project from '../models/Project';

export const getAllProjects = async (serviceType?: string) => {
  const filter = serviceType ? { serviceType } : {};
  return await Project.find(filter)
    .populate('serviceType', 'title parentCategory')
    .sort({ completionDate: -1 });
};

export const createProjectQuery = async (data: any) => {
  return await Project.create(data);
};

export const updateProjectQuery = async (id: string, data: any) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }

  return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteProjectQuery = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }

  await Project.deleteOne({ _id: project._id });
  return true;
};
