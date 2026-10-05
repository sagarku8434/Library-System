import express from 'express';
import { Seat } from '../models/Seat.js';
import { Room } from '../models/Room.js';
import { PricingPlan } from '../models/PricingPlan.js';
import { bookingEngine } from '../services/bookingEngine.js';

const router = express.Router();

// GET /api/seats/availability?date=YYYY-MM-DD&shiftId=...
router.get('/availability', async (req, res, next) => {
  try {
    const { date, shiftId } = req.query;
    if (!date || !shiftId) {
      return res.status(400).json({ success: false, message: 'date and shiftId query parameters are required' });
    }

    const seats = await Seat.find();
    const availabilityMap = {};

    for (const seat of seats) {
      const status = await bookingEngine.checkAvailability(seat.seatId, date, shiftId);
      availabilityMap[seat.seatId] = status;
    }

    res.json({
      success: true,
      date,
      shiftId,
      availability: availabilityMap
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/seats (all seats with room info)
router.get('/', async (req, res, next) => {
  try {
    const seats = await Seat.find();
    const rooms = await Room.find();
    res.json({ success: true, seats, rooms });
  } catch (err) {
    next(err);
  }
});

// GET /api/pricing
router.get('/pricing', async (req, res, next) => {
  try {
    const plans = await PricingPlan.find({ isActive: true });
    res.json({ success: true, plans });
  } catch (err) {
    next(err);
  }
});

export default router;
