import express from 'express';
import { Attendance } from '../models/Attendance.js';
import { Booking } from '../models/Booking.js';
import { qrService } from '../services/qrService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/attendance/live-qr - Reception desk live rotating display
router.get('/live-qr', (req, res) => {
  const current = qrService.getCurrentToken();
  res.json({
    success: true,
    ...current
  });
});

// POST /api/attendance/check-in
router.post('/check-in', protect, async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!qrService.validateToken(token)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reception QR token' });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // Check active approved booking
    const activeBooking = await Booking.findOne({
      studentId: req.user._id,
      approvalStatus: 'approved',
      attendanceEnabled: true,
      startDate: { $lte: todayStr },
      endDate: { $gte: todayStr }
    });

    if (!activeBooking) {
      return res.status(403).json({
        success: false,
        message: 'No approved active booking for today or QR attendance not enabled'
      });
    }

    // Check duplicate check-in
    const existing = await Attendance.findOne({ studentId: req.user._id, date: todayStr });
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Already checked in for today' });
    }

    const attendance = await Attendance.create({
      attendanceId: `ATT_${Date.now()}`,
      studentId: req.user._id,
      bookingId: activeBooking.bookingId,
      seatNumber: activeBooking.seatId,
      date: todayStr,
      shiftId: activeBooking.shiftId,
      checkIn: nowTime,
      method: 'Dynamic QR',
      status: 'present'
    });

    res.status(201).json({
      success: true,
      action: 'checkin',
      time: nowTime,
      attendance
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/attendance/check-out
router.post('/check-out', protect, async (req, res, next) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const existing = await Attendance.findOne({ studentId: req.user._id, date: todayStr });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'No check-in record found for today' });
    }
    if (existing.checkOut) {
      return res.status(400).json({ success: false, message: 'Already checked out for today' });
    }

    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    existing.checkOut = nowTime;
    await existing.save();

    res.json({
      success: true,
      action: 'checkout',
      time: nowTime,
      attendance: existing
    });
  } catch (err) {
    next(err);
  }
});

export default router;
