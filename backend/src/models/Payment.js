import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true, index: true },
  bookingId: { type: String, required: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  providerOrderId: { type: String, index: true },
  providerPaymentId: { type: String, index: true },
  receiptNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['success', 'refunded', 'failed', 'pending'], default: 'success', index: true },
  method: { type: String, default: 'Razorpay Gateway' },
  refundNote: { type: String },
  refundedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', paymentSchema);
