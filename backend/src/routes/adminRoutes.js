import express from 'express';
import { Booking } from '../models/Booking.js';
import { Payment } from '../models/Payment.js';
import { Attendance } from '../models/Attendance.js';
import { User } from '../models/User.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { Seat } from '../models/Seat.js';
import { LibrarySettings } from '../models/LibrarySettings.js';
import { bookingEngine } from '../services/bookingEngine.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware: ensure caller is admin
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Forbidden: Admin authorization required' });
};

router.use(protect, requireAdmin);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res, next) => {
  try {
    const totalCollected = (await Payment.find({ status: 'success' })).reduce((acc, p) => acc + p.amount, 0);
    const totalRefunded = (await Payment.find({ status: 'refunded' })).reduce((acc, p) => acc + p.amount, 0);
    const activeSeatsCount = await Booking.countDocuments({ approvalStatus: 'approved' });
    const pendingRequestsCount = await Booking.countDocuments({ approvalStatus: 'pending' });
    const totalSeats = await Seat.countDocuments();
    const studentsCount = await User.countDocuments({ role: 'student' });

    res.json({
      success: true,
      stats: {
        totalCollected,
        totalRefunded,
        netRevenue: totalCollected - totalRefunded,
        activeSeatsCount,
        pendingRequestsCount,
        totalSeats,
        occupancyRate: Math.round((activeSeatsCount / (totalSeats || 1)) * 100),
        studentsCount
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/requests
router.get('/requests', async (req, res, next) => {
  try {
    const requests = await Booking.find({ approvalStatus: 'pending' }).populate('studentId', 'name email phone').sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/bookings/:id/approve
router.patch('/bookings/:id/approve', async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      { approvalStatus: 'approved', attendanceEnabled: true },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, message: 'Booking approved and QR attendance enabled', booking });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/bookings/:id/reject
router.patch('/bookings/:id/reject', async (req, res, next) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      { approvalStatus: 'rejected', attendanceEnabled: false, rejectionReason: reason || 'Admin rejected' },
      { new: true }
    );

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // Release database allocations
    await bookingEngine.releaseBooking(booking.bookingId);

    // Flag refund on payment
    await Payment.findOneAndUpdate(
      { bookingId: booking.bookingId },
      { status: 'refunded', refundNote: reason, refundedAt: new Date() }
    );

    res.json({ success: true, message: 'Booking rejected and refund processed', booking });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/students
router.get('/students', async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-passwordHash');
    res.json({ success: true, students });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/payments
router.get('/payments', async (req, res, next) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/revenue
router.get('/revenue', async (req, res, next) => {
  try {
    const payments = await Payment.find();
    const successful = payments.filter(p => p.status === 'success');
    const refunded = payments.filter(p => p.status === 'refunded');

    const totalCollected = successful.reduce((sum, p) => sum + p.amount, 0);
    const totalRefunded = refunded.reduce((sum, p) => sum + p.amount, 0);

    res.json({
      success: true,
      totalCollected,
      totalRefunded,
      netRevenue: totalCollected - totalRefunded,
      transactionCount: payments.length
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/offline-bookings
router.post('/offline-bookings', async (req, res, next) => {
  try {
    const { name, phone, seatId, planId, shiftId, startDate, endDate, amount, paymentMethod } = req.body;

    // Check or create student
    let student = await User.findOne({ phone });
    if (!student) {
      student = await User.create({
        name,
        phone,
        email: `${phone}@athena.walkin`,
        passwordHash: 'offline_user',
        role: 'student'
      });
    }

    const bookingId = `ATH-BOOK-OFF-${Date.now().toString().slice(-4)}`;
    const newBooking = await Booking.create({
      bookingId,
      studentId: student._id,
      seatId,
      planId,
      shiftId,
      startDate,
      endDate,
      amount,
      paymentStatus: 'paid',
      approvalStatus: 'approved',
      attendanceEnabled: true,
      bookingType: 'offline'
    });

    // Commit allocations
    await bookingEngine.allocateBooking(newBooking);

    // Create payment record
    const payment = await Payment.create({
      paymentId: `PAY_OFF_${Date.now()}`,
      bookingId,
      studentId: student._id,
      amount,
      receiptNumber: `ATH-REC-OFF-${Date.now().toString().slice(-4)}`,
      status: 'success',
      method: paymentMethod || 'Cash'
    });

    res.status(201).json({
      success: true,
      message: 'Offline booking registered successfully',
      booking: newBooking,
      payment
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/settings
router.patch('/settings', async (req, res, next) => {
  try {
    const updated = await LibrarySettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ success: true, settings: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
