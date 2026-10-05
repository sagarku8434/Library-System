import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  address: { type: String, default: '' },
  idType: { type: String, enum: ['Aadhaar Card', 'College ID', 'Voter ID', 'Driving License'], default: 'Aadhaar Card' },
  idNumber: { type: String, default: '' },
  idDocumentRef: { type: String, required: true }, // Points to private storage vault
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'verified' },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
