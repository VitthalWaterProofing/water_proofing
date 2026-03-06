import Service from '../models/Service';

export const getActiveServices = async () => {
  return await Service.find({ isActive: true });
};

export const getServiceByIdQuery = async (id: string) => {
  return await Service.findById(id);
};

export const createServiceQuery = async (data: any) => {
  const service = new Service({
    title: data.title,
    description: data.description,
    shortDescription: data.shortDescription,
    coverImage: data.coverImage,
    benefits: data.benefits,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });

  return await service.save();
};

export const updateServiceQuery = async (id: string, data: any) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }

  service.title = data.title || service.title;
  service.description = data.description || service.description;
  service.shortDescription = data.shortDescription || service.shortDescription;
  service.coverImage = data.coverImage || service.coverImage;
  service.benefits = data.benefits || service.benefits;
  
  if (data.isActive !== undefined) {
      service.isActive = data.isActive;
  }

  return await service.save();
};

export const deleteServiceQuery = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }

  await Service.deleteOne({ _id: service._id });
  return true;
};
