import express from 'express';
import { Booking } from '../models/Booking.js';
import { Payment } from '../models/Payment.js';
import { Attendance } from '../models/Attendance.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/students/me/bookings - Only own bookings (OWASP IDOR protection)
router.get('/me/bookings', protect, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ studentId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
});

// GET /api/students/me/attendance - Only own attendance
router.get('/me/attendance', protect, async (req, res, next) => {
  try {
    const attendanceLogs = await Attendance.find({ studentId: req.user._id }).sort({ date: -1 });
    res.json({ success: true, attendance: attendanceLogs });
  } catch (err) {
    next(err);
  }
});

// GET /api/students/me/receipts/:id - Only own receipt
router.get('/me/receipts/:id', protect, async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      $or: [{ receiptNumber: req.params.id }, { paymentId: req.params.id }],
      studentId: req.user._id // Strict tenant ownership
    });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Receipt not found or unauthorized' });
    }

    res.json({ success: true, payment });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/students/me/profile - Update own profile
router.patch('/me/profile', protect, async (req, res, next) => {
  try {
    const { address, idType, idNumber } = req.body;
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      { address, idType, idNumber },
      { new: true, upsert: true }
    );
    res.json({ success: true, profile });
  } catch (err) {
    next(err);
  }
});

export default router;
