import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  customerName: string;
  email: string;
  phone: string;
  serviceRequested: string; // Could also be a reference if needed
  message: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Closed';
}

const LeadSchema: Schema = new Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String, // Kept as string to handle formats like (123) 456-7890
      required: [true, 'Please provide a phone number'],
    },
    serviceRequested: {
      type: String, 
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message or details of your issue'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quoted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>('Lead', LeadSchema);
