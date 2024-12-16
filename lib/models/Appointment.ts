import mongoose from 'mongoose';

export interface IAppointment extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: Date;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const AppointmentSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
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
  service: {
    type: String,
    required: [true, 'Le service est requis'],
  },
  date: {
    type: Date,
    required: [true, 'La date est requise'],
  },
  time: {
    type: String,
    required: [true, "L'heure est requise"],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  }
}, {
  timestamps: true
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);