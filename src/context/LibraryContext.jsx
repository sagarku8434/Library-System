import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  INITIAL_ROOMS,
  INITIAL_SHIFTS,
  INITIAL_PRICING_PLANS,
  INITIAL_SEATS,
  INITIAL_SETTINGS,
  INITIAL_BOOKINGS,
  INITIAL_PAYMENTS,
  INITIAL_ATTENDANCE
} from '../data/athenaData';

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  // Persistence in LocalStorage with fallback to seed
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('athena_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem('athena_shifts');
    return saved ? JSON.parse(saved) : INITIAL_SHIFTS;
  });

  const [pricingPlans, setPricingPlans] = useState(() => {
    const saved = localStorage.getItem('athena_plans');
    return saved ? JSON.parse(saved) : INITIAL_PRICING_PLANS;
  });

  const [seats, setSeats] = useState(() => {
    const saved = localStorage.getItem('athena_seats');
    return saved ? JSON.parse(saved) : INITIAL_SEATS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('athena_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('athena_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('athena_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('athena_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  // Temporary holds during checkout: { [seatId]: { expiresAt: number, heldByStudentId: string, shiftId: string, date: string } }
  const [holds, setHolds] = useState({});

  // Dynamic rotating QR token for library entrance check-in (rotates every 30 seconds)
  const [rotatingQr, setRotatingQr] = useState(() => {
    return {
      token: `ATH_QR_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      validUntil: Date.now() + 30000
    };
  });

  // Rotate QR code timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingQr({
        token: `ATH_QR_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        validUntil: Date.now() + 30000
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('athena_rooms', JSON.stringify(rooms));
    localStorage.setItem('athena_shifts', JSON.stringify(shifts));
    localStorage.setItem('athena_plans', JSON.stringify(pricingPlans));
    localStorage.setItem('athena_seats', JSON.stringify(seats));
    localStorage.setItem('athena_settings', JSON.stringify(settings));
    localStorage.setItem('athena_bookings', JSON.stringify(bookings));
    localStorage.setItem('athena_payments', JSON.stringify(payments));
    localStorage.setItem('athena_attendance', JSON.stringify(attendance));
  }, [rooms, shifts, pricingPlans, seats, settings, bookings, payments, attendance]);

  // Clean expired holds every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHolds(prev => {
        let changed = false;
        const next = { ...prev };
        for (const [key, hold] of Object.entries(next)) {
          if (hold.expiresAt <= now) {
            delete next[key];
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Conflict-safe availability check
   * Checks whether seat is free for target date & shiftId
   */
  const checkSeatAvailability = useCallback((seatId, targetDate, shiftId) => {
    const seat = seats.find(s => s.seatId === seatId);
    if (!seat || seat.activeStatus !== 'active') return 'disabled';

    // 1. Check temporary checkout hold
    const holdKey = `${seatId}_${targetDate}`;
    const hold = holds[holdKey];
    if (hold && hold.expiresAt > Date.now()) {
      if (hold.shiftId === shiftId || hold.shiftId === 'SHIFT_FULL_DAY' || shiftId === 'SHIFT_FULL_DAY') {
        return 'held';
      }
    }

    // 2. Check active bookings
    const activeBookings = bookings.filter(b => {
      if (b.seatId !== seatId) return false;
      if (b.approvalStatus === 'rejected') return false; // Rejected bookings release allocations
      if (b.paymentStatus !== 'paid' && b.bookingType === 'online') return false;
      // Date span check
      return targetDate >= b.startDate && targetDate <= b.endDate;
    });

    for (const b of activeBookings) {
      // Direct shift match
      if (b.shiftId === shiftId) return 'occupied';
      // Full day blocks everything
      if (b.shiftId === 'SHIFT_FULL_DAY' || b.shiftId === 'SHIFT_24X7') return 'occupied';
      // If someone wants Full Day, any existing shift blocks it
      if (shiftId === 'SHIFT_FULL_DAY' || shiftId === 'SHIFT_24X7') return 'occupied';
    }

    return 'available';
  }, [seats, holds, bookings]);

  /**
   * Acquire a temporary hold (10 min) for checkout
   */
  const holdSeat = useCallback((seatId, targetDate, shiftId, studentId) => {
    const availability = checkSeatAvailability(seatId, targetDate, shiftId);
    if (availability !== 'available') {
      return { success: false, reason: availability };
    }
    const holdKey = `${seatId}_${targetDate}`;
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes hold
    setHolds(prev => ({
      ...prev,
      [holdKey]: { seatId, targetDate, shiftId, studentId, expiresAt }
    }));
    return { success: true, expiresAt };
  }, [checkSeatAvailability]);

  /**
   * Release hold
   */
  const releaseHold = useCallback((seatId, targetDate) => {
    const holdKey = `${seatId}_${targetDate}`;
    setHolds(prev => {
      const next = { ...prev };
      delete next[holdKey];
      return next;
    });
  }, []);

  /**
   * Complete booking & payment
   */
  const createBooking = useCallback((bookingData, paymentData) => {
    const newBookingId = `ATH-BOOK-${Date.now().toString().slice(-4)}`;
    const newPaymentId = `PAY-RZP-${Date.now().toString().slice(-6)}`;
    const newReceiptNum = `ATH-REC-2026-${String(payments.length + 1).padStart(3, '0')}`;

    const newBooking = {
      bookingId: newBookingId,
      studentId: bookingData.studentId,
      studentName: bookingData.studentName,
      studentPhone: bookingData.studentPhone,
      studentEmail: bookingData.studentEmail,
      seatId: bookingData.seatId,
      seatNumber: bookingData.seatNumber || bookingData.seatId,
      roomId: bookingData.roomId,
      roomName: bookingData.roomName || 'Ground Floor Main Hall',
      planId: bookingData.planId,
      planName: bookingData.planName,
      shiftId: bookingData.shiftId,
      shiftName: bookingData.shiftName,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      amount: bookingData.amount,
      paymentStatus: 'paid',
      paymentId: newPaymentId,
      approvalStatus: bookingData.isOffline ? 'approved' : 'pending',
      attendanceEnabled: bookingData.isOffline ? true : false,
      bookingType: bookingData.isOffline ? 'offline' : 'online',
      createdAt: new Date().toISOString()
    };

    const newPayment = {
      paymentId: newPaymentId,
      bookingId: newBookingId,
      studentId: bookingData.studentId,
      studentName: bookingData.studentName,
      amount: bookingData.amount,
      method: paymentData.method || 'Razorpay Gateway',
      providerOrderId: paymentData.orderId || `order_${Math.random().toString(36).slice(2, 9)}`,
      providerPaymentId: paymentData.paymentId || `pay_${Math.random().toString(36).slice(2, 9)}`,
      status: 'success',
      paidAt: new Date().toISOString(),
      receiptNumber: newReceiptNum
    };

    // Release temporary hold
    releaseHold(bookingData.seatId, bookingData.startDate);

    setBookings(prev => [newBooking, ...prev]);
    setPayments(prev => [newPayment, ...prev]);

    return { success: true, booking: newBooking, payment: newPayment };
  }, [payments.length, releaseHold]);

  /**
   * Approve booking (Admin)
   */
  const approveBooking = useCallback((bookingId) => {
    setBookings(prev => prev.map(b => {
      if (b.bookingId === bookingId) {
        return { ...b, approvalStatus: 'approved', attendanceEnabled: true };
      }
      return b;
    }));
  }, []);

  /**
   * Reject booking (Admin) -> Triggers refund workflow
   */
  const rejectBooking = useCallback((bookingId, reason = 'Seat realignment / Verification declined') => {
    setBookings(prev => prev.map(b => {
      if (b.bookingId === bookingId) {
        return {
          ...b,
          approvalStatus: 'rejected',
          attendanceEnabled: false,
          rejectionReason: reason
        };
      }
      return b;
    }));
    // Mark payment status as refunded
    setPayments(prev => prev.map(p => {
      if (p.bookingId === bookingId) {
        return { ...p, status: 'refunded', refundNote: reason, refundedAt: new Date().toISOString() };
      }
      return p;
    }));
  }, []);

  /**
   * Student Check-in via rotating QR scanner
   */
  const markAttendance = useCallback((studentId, scannedToken) => {
    // 1. Verify dynamic token
    if (scannedToken !== rotatingQr.token && !scannedToken.startsWith('ATH_QR_')) {
      return { success: false, message: 'Invalid or expired QR code. Please scan the live QR on reception.' };
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // 2. Verify student has approved active booking for today
    const activeBooking = bookings.find(b => 
      b.studentId === studentId &&
      b.approvalStatus === 'approved' &&
      b.attendanceEnabled &&
      todayStr >= b.startDate &&
      todayStr <= b.endDate
    );

    if (!activeBooking) {
      return { success: false, message: 'No approved active booking found for today. Please check your bookings.' };
    }

    // 3. Check duplicate check-in
    const existing = attendance.find(a => a.studentId === studentId && a.date === todayStr);
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (existing) {
      if (existing.checkOut) {
        return { success: false, message: 'You have already completed check-in and check-out for today.' };
      }
      // Perform check-out
      setAttendance(prev => prev.map(a => {
        if (a.attendanceId === existing.attendanceId) {
          return { ...a, checkOut: nowTime };
        }
        return a;
      }));
      return { success: true, action: 'checkout', time: nowTime, message: `Checked out successfully at ${nowTime}!` };
    }

    // New check-in
    const newRecord = {
      attendanceId: `ATT_${Date.now()}`,
      studentId: studentId,
      studentName: activeBooking.studentName,
      seatNumber: activeBooking.seatNumber,
      date: todayStr,
      shiftId: activeBooking.shiftId,
      checkIn: nowTime,
      checkOut: null,
      method: 'Dynamic QR',
      status: 'present'
    };

    setAttendance(prev => [newRecord, ...prev]);
    return { success: true, action: 'checkin', time: nowTime, seat: activeBooking.seatNumber, message: `Checked in at ${nowTime} for Seat ${activeBooking.seatNumber}!` };
  }, [rotatingQr.token, bookings, attendance]);

  /**
   * Manual Attendance correction (Admin)
   */
  const manualCorrectAttendance = useCallback((attendanceId, updates) => {
    setAttendance(prev => prev.map(a => a.attendanceId === attendanceId ? { ...a, ...updates } : a));
  }, []);

  /**
   * Update seat status (Admin: enable, disable, relocate)
   */
  const updateSeat = useCallback((seatId, updates) => {
    setSeats(prev => prev.map(s => s.seatId === seatId ? { ...s, ...updates } : s));
  }, []);

  const addSeat = useCallback((newSeat) => {
    setSeats(prev => [...prev, newSeat]);
  }, []);

  const removeSeat = useCallback((seatId) => {
    setSeats(prev => prev.filter(s => s.seatId !== seatId));
  }, []);

  /**
   * Update Shift/Pricing Plan (Admin)
   */
  const updatePricingPlan = useCallback((planId, updates) => {
    setPricingPlans(prev => prev.map(p => p.planId === planId ? { ...p, ...updates } : p));
  }, []);

  const addPricingPlan = useCallback((plan) => {
    setPricingPlans(prev => [...prev, plan]);
  }, []);

  /**
   * Update Library Settings / Content (Admin)
   */
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Compute Revenue Analytics
  const revenueStats = useMemo(() => {
    const totalCollected = payments.filter(p => p.status === 'success').reduce((acc, p) => acc + p.amount, 0);
    const totalRefunded = payments.filter(p => p.status === 'refunded').reduce((acc, p) => acc + p.amount, 0);
    const netRevenue = totalCollected - totalRefunded;
    const activeSeatsCount = bookings.filter(b => b.approvalStatus === 'approved').length;
    const pendingRequestsCount = bookings.filter(b => b.approvalStatus === 'pending').length;
    const totalOccupancyRate = Math.round((activeSeatsCount / (seats.length || 1)) * 100);

    return {
      totalCollected,
      totalRefunded,
      netRevenue,
      activeSeatsCount,
      pendingRequestsCount,
      totalOccupancyRate
    };
  }, [payments, bookings, seats.length]);

  return (
    <LibraryContext.Provider value={{
      rooms,
      shifts,
      pricingPlans,
      seats,
      settings,
      bookings,
      payments,
      attendance,
      holds,
      rotatingQr,
      revenueStats,
      checkSeatAvailability,
      holdSeat,
      releaseHold,
      createBooking,
      approveBooking,
      rejectBooking,
      markAttendance,
      manualCorrectAttendance,
      updateSeat,
      addSeat,
      removeSeat,
      updatePricingPlan,
      addPricingPlan,
      updateSettings
    }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
