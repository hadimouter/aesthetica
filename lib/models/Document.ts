import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  type: String,
  url: String,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
