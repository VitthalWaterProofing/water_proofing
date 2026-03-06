import Testimonial from '../models/Testimonial';

export const getApprovedTestimonials = async () => {
  return await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
};

export const getAllTestimonialsAdmin = async () => {
  return await Testimonial.find({}).sort({ createdAt: -1 });
};

export const createTestimonialQuery = async (data: any) => {
  return await Testimonial.create(data);
};

export const updateTestimonialQuery = async (id: string, data: any) => {
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw new Error('Testimonial not found');
  }

  testimonial.customerName = data.customerName || testimonial.customerName;
  testimonial.rating = data.rating || testimonial.rating;
  testimonial.reviewText = data.reviewText || testimonial.reviewText;
  
  if (data.isApproved !== undefined) {
    testimonial.isApproved = data.isApproved;
  }

  return await testimonial.save();
};

export const deleteTestimonialQuery = async (id: string) => {
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw new Error('Testimonial not found');
  }

  await Testimonial.deleteOne({ _id: testimonial._id });
  return true;
};
