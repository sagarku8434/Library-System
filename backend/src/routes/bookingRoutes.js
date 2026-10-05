import express from 'express';
import { Booking } from '../models/Booking.js';
import { PricingPlan } from '../models/PricingPlan.js';
import { bookingEngine } from '../services/bookingEngine.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/bookings/hold - Temporary hold
router.post('/hold', protect, async (req, res, next) => {
  try {
    const { seatId, date, shiftId } = req.body;
    const holdResult = await bookingEngine.holdSeat(seatId, date, shiftId, req.user._id);

    if (!holdResult.success) {
      return res.status(409).json({
        success: false,
        message: `Desk ${seatId} is currently ${holdResult.reason}. Please select another desk.`
      });
    }

    res.json({
      success: true,
      message: 'Desk held for 10 minutes checkout window',
      holdId: holdResult.holdId
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/bookings - Commit booking
router.post('/', protect, async (req, res, next) => {
  try {
    const { seatId, planId, shiftId, startDate, endDate, isOffline } = req.body;

    // Fetch plan to lock price snapshot
    const plan = await PricingPlan.findOne({ planId });
    const amount = plan ? plan.amount : req.body.amount || 800;

    const bookingId = `ATH-BOOK-${Date.now().toString().slice(-4)}`;

    const newBooking = await Booking.create({
      bookingId,
      studentId: req.user._id,
      seatId,
      planId,
      shiftId,
      startDate,
      endDate,
      amount, // Snapshot price locked
      paymentStatus: 'paid',
      approvalStatus: isOffline ? 'approved' : 'pending',
      attendanceEnabled: isOffline ? true : false,
      bookingType: isOffline ? 'offline' : 'online'
    });

    // Commit allocations across multi-day dates
    await bookingEngine.allocateBooking(newBooking);

    res.status(201).json({
      success: true,
      booking: newBooking
    });
  } catch (err) {
    next(err);
  }
});

export default router;
