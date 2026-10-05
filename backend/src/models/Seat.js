import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true, unique: true, index: true },
  seatNumber: { type: String, required: true },
  roomId: { type: String, required: true, index: true },
  row: { type: Number },
  col: { type: Number },
  activeStatus: { type: String, enum: ['active', 'disabled', 'maintenance'], default: 'active', index: true },
  hasSocket: { type: Boolean, default: true },
  hasCubicle: { type: Boolean, default: true },
  hasLamp: { type: Boolean, default: true }
});

export const Seat = mongoose.model('Seat', seatSchema);
