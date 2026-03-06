import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  location: string;
  images: string[];
  serviceType: mongoose.Types.ObjectId;
  completionDate: Date;
  isFeatured: boolean;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    location: {
      type: String, // e.g., 'Toronto, ON'
      required: [true, 'Please add a project location'],
    },
    images: {
      type: [String], // Array of URLs
      default: [],
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
