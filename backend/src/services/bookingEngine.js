import { Seat } from '../models/Seat.js';
import { Booking } from '../models/Booking.js';
import { SeatAllocation } from '../models/SeatAllocation.js';

export const bookingEngine = {
  /**
   * Check seat availability with shift conflict & full-day overlap rules
   */
  async checkAvailability(seatId, date, shiftId) {
    const seat = await Seat.findOne({ seatId });
    if (!seat || seat.activeStatus !== 'active') return 'disabled';

    // 1. Check temporary holds
    const now = new Date();
    const activeHold = await SeatAllocation.findOne({
      seatId,
      date,
      reservationStatus: 'held',
      expiresAt: { $gt: now }
    });

    if (activeHold) {
      if (activeHold.shiftId === shiftId || activeHold.shiftId === 'SHIFT_FULL_DAY' || shiftId === 'SHIFT_FULL_DAY') {
        return 'held';
      }
    }

    // 2. Check active allocations
    const activeAllocations = await SeatAllocation.find({
      seatId,
      date,
      reservationStatus: 'active'
    });

    for (const alloc of activeAllocations) {
      if (alloc.shiftId === shiftId) return 'occupied';
      if (alloc.shiftId === 'SHIFT_FULL_DAY' || alloc.shiftId === 'SHIFT_24X7') return 'occupied';
      if (shiftId === 'SHIFT_FULL_DAY' || shiftId === 'SHIFT_24X7') return 'occupied';
    }

    return 'available';
  },

  /**
   * Temporary 10-minute hold
   */
  async holdSeat(seatId, date, shiftId, studentId) {
    const status = await this.checkAvailability(seatId, date, shiftId);
    if (status !== 'available') {
      return { success: false, reason: status };
    }

    const holdAllocation = new SeatAllocation({
      bookingId: `HOLD_${Date.now()}`,
      seatId,
      date,
      shiftId,
      reservationStatus: 'held',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    await holdAllocation.save();
    return { success: true, holdId: holdAllocation._id };
  },

  /**
   * Commit multi-day seat allocations for an approved / paid booking
   */
  async allocateBooking(booking) {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const allocations = [];

    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      allocations.push({
        bookingId: booking.bookingId,
        seatId: booking.seatId,
        date: dateStr,
        shiftId: booking.shiftId,
        reservationStatus: 'active'
      });
      current.setDate(current.getDate() + 1);
    }

    // Insert all multi-day date claims atomically
    await SeatAllocation.insertMany(allocations, { ordered: true });
    return allocations;
  },

  /**
   * Release seat allocations on booking cancellation or admin rejection
   */
  async releaseBooking(bookingId) {
    await SeatAllocation.deleteMany({ bookingId });
  }
};
