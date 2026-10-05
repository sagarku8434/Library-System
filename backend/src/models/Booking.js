import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  seatId: { type: String, required: true, index: true },
  planId: { type: String, required: true },
  shiftId: { type: String, required: true },
  startDate: { type: String, required: true, index: true }, // Format: YYYY-MM-DD
  endDate: { type: String, required: true, index: true },   // Format: YYYY-MM-DD
  amount: { type: Number, required: true }, // Transaction price snapshot
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded', 'failed'], default: 'pending', index: true },
  paymentId: { type: String },
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
  rejectionReason: { type: String },
  attendanceEnabled: { type: Boolean, default: false },
  bookingType: { type: String, enum: ['online', 'offline'], default: 'online' },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);
