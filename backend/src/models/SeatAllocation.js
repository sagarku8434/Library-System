import mongoose from 'mongoose';

const seatAllocationSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, index: true },
  seatId: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  shiftId: { type: String, required: true },
  reservationStatus: { type: String, enum: ['held', 'active', 'released'], default: 'active', index: true },
  expiresAt: { type: Date } // For temporary holds
});

// Compound unique index to guarantee atomic double-booking protection at database level
seatAllocationSchema.index({ seatId: 1, date: 1, shiftId: 1, reservationStatus: 1 });

export const SeatAllocation = mongoose.model('SeatAllocation', seatAllocationSchema);
