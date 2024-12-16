import mongoose from 'mongoose';

const MedicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: String,
  date: Date,
  notes: String,
  doctor: String,
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.MedicalRecord || mongoose.model('MedicalRecord', MedicalRecordSchema);