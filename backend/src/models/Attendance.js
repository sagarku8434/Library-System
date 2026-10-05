import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  attendanceId: { type: String, required: true, unique: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookingId: { type: String, index: true },
  seatNumber: { type: String, required: true },
  date: { type: String, required: true, index: true }, // YYYY-MM-DD
  shiftId: { type: String },
  checkIn: { type: String, required: true }, // Format: HH:MM AM/PM
  checkOut: { type: String },
  method: { type: String, default: 'Dynamic QR' },
  status: { type: String, enum: ['present', 'absent', 'excused'], default: 'present' },
  createdAt: { type: Date, default: Date.now }
});

// Avoid duplicate check-in records for the same student on the same day
attendanceSchema.index({ studentId: 1, date: 1 });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
