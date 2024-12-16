import mongoose from 'mongoose';

export interface IContact extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  object:string;
  message?: string;
  createdAt: Date;
}

const ContactSchema = new mongoose.Schema({
  
    name: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
    trim: true,
  },
  object: {
    type: String,
    required: [true, 'Le service est requis'],
  },
  message: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);