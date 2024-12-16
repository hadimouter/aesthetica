import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
