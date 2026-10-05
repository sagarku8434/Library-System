import express from 'express';
import { Payment } from '../models/Payment.js';
import { Booking } from '../models/Booking.js';
import { paymentGateway } from '../config/paymentGateway.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/payments/order - Create gateway order
router.post('/order', protect, async (req, res, next) => {
  try {
    const { bookingId, amount } = req.body;
    const order = await paymentGateway.createOrder({
      amount,
      receipt: `rec_${bookingId}`
    });

    res.json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/payments/verify - Verify checkout signature
router.post('/verify', protect, async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, bookingId, amount, method } = req.body;

    const isValid = paymentGateway.verifySignature({ orderId, paymentId, signature });
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature or verification failed' });
    }

    const receiptNumber = `ATH-REC-2026-${Date.now().toString().slice(-4)}`;

    const payment = await Payment.create({
      paymentId: `PAY_${Date.now()}`,
      bookingId,
      studentId: req.user._id,
      amount,
      providerOrderId: orderId,
      providerPaymentId: paymentId,
      receiptNumber,
      status: 'success',
      method: method || 'Razorpay UPI'
    });

    // Update booking status
    await Booking.findOneAndUpdate(
      { bookingId },
      { paymentStatus: 'paid', paymentId: payment.paymentId }
    );

    res.json({
      success: true,
      message: 'Payment verified and recorded',
      payment
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/payments/webhook - Gateway event listener
router.post('/webhook', async (req, res) => {
  // Webhook handler for asynchronous payments & refunds
  res.status(200).json({ status: 'ok' });
});

export default router;
