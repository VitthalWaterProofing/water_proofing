import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  rating: number;
  reviewText: string;
  isApproved: boolean;
}

const TestimonialSchema: Schema = new Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please add a customer name'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: [true, 'Please add review text'],
    },
    isApproved: {
      type: Boolean,
      default: false, // Requires admin approval to show on frontend
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
