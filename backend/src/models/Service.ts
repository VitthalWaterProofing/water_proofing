import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  benefits: string[];
  isActive: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please add a short description for cards'],
      maxlength: [200, 'Short description cannot be more than 200 characters'],
    },
    coverImage: {
      type: String, // URL to image hosting or local path
      default: 'no-photo.jpg',
    },
    benefits: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>('Service', ServiceSchema);
