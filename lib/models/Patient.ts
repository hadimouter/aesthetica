import mongoose from 'mongoose';

export interface IPatient extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  medicalHistory: {
    allergies: string[];
    medications: string[];
    previousSurgeries: string[];
    conditions: string[];
  };
  consultations: mongoose.Types.ObjectId[];
  documents: {
    name: string;
    url: string;
    type: string;
    uploadedAt: Date;
  }[];
}

const PatientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide a date of birth']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number']
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  medicalHistory: {
    allergies: [String],
    medications: [String],
    previousSurgeries: [String],
    conditions: [String]
  },
  consultations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation'
  }],
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);