import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { UserPlus, Armchair, CheckCircle2, AlertCircle, CreditCard } from 'lucide-react';

export default function OfflineAdmissions() {
  const { 
    shifts, 
    pricingPlans, 
    seats, 
    rooms, 
    checkSeatAvailability, 
    createBooking 
  } = useLibrary();

  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [idType, setIdType] = useState('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedShiftId, setSelectedShiftId] = useState(shifts[0]?.id || '');
  const [selectedPlanId, setSelectedPlanId] = useState(pricingPlans[1]?.planId || '');
  const [selectedSeatId, setSelectedSeatId] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const selectedPlan = pricingPlans.find(p => p.planId === selectedPlanId) || pricingPlans[0];
  const selectedShift = shifts.find(s => s.id === selectedShiftId) || shifts[0];
  const selectedSeat = seats.find(s => s.seatId === selectedSeatId);
  const selectedRoom = rooms.find(r => r.roomId === selectedSeat?.roomId);

  // Filter available seats for the target date and shift
  const availableSeats = seats.filter(s => {
    return checkSeatAvailability(s.seatId, selectedDate, selectedShiftId) === 'available';
  });

  const handleSubmitAdmission = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedSeatId) {
      setErrorMsg('Please select an available desk from the dropdown.');
      return;
    }

    // Calculate End Date
    const start = new Date(selectedDate);
    const end = new Date(start);
    end.setDate(start.getDate() + (selectedPlan.durationDays || 30) - 1);
    const endDateStr = end.toISOString().split('T')[0];

    const studentId = `WALK_${Date.now().toString().slice(-5)}`;

    const bookingPayload = {
      studentId: studentId,
      studentName: studentName,
      studentPhone: studentPhone,
      studentEmail: studentEmail || `${studentPhone}@athena.offline`,
      seatId: selectedSeat.seatId,
      seatNumber: selectedSeat.seatNumber,
      roomId: selectedSeat.roomId,
      roomName: selectedRoom?.roomName || 'Ground Floor Main Hall',
      planId: selectedPlan.planId,
      planName: selectedPlan.name,
      shiftId: selectedShift.id,
      shiftName: selectedShift.name,
      startDate: selectedDate,
      endDate: endDateStr,
      amount: selectedPlan.amount,
      isOffline: true
    };

    const paymentPayload = {
      method: `Offline (${paymentMode})`,
      orderId: `offline_rec_${Date.now()}`,
      paymentId: `cash_${Date.now()}`
    };

    const result = createBooking(bookingPayload, paymentPayload);

    if (result.success) {
      setSuccessResult({
        booking: result.booking,
        payment: result.payment
      });
      // Clear form
      setStudentName('');
      setStudentPhone('');
      setStudentEmail('');
      setIdNumber('');
      setSelectedSeatId('');
    } else {
      setErrorMsg('Could not allocate seat. Slot might have conflicted.');
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Offline Admissions & Walk-in Desk Pass</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Register front-desk walk-in students using the shared conflict-safe availability engine
        </p>
      </div>

      {successResult && (
        <div style={{ padding: '20px', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '16px' }}>
            <CheckCircle2 size={20} />
            <span>Admission Registered Successfully!</span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', lineHeight: '1.5' }}>
            Allocated: <strong>Desk {successResult.booking.seatNumber}</strong> ({successResult.booking.shiftName}) · Valid: {successResult.booking.startDate} to {successResult.booking.endDate} · Receipt: <strong>{successResult.payment.receiptNumber}</strong> (₹{successResult.payment.amount} {successResult.payment.method})
          </div>
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmitAdmission}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            1. Student Personal & ID Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Alok Verma"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                required
                className="form-input"
                placeholder="e.g. 98123 45678"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. alok@gmail.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Physical ID Verified</label>
              <select className="form-select" value={idType} onChange={(e) => setIdType(e.target.value)}>
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="College ID">College ID Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Document Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 9981-XXXX-1120"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '20px 0 16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            2. Seat Allocation & Subscription Timing
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                required
                className="form-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Study Shift Slot</label>
              <select 
                className="form-select"
                value={selectedShiftId}
                onChange={(e) => {
                  setSelectedShiftId(e.target.value);
                  setSelectedSeatId('');
                }}
              >
                {shifts.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.label})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Membership Plan</label>
              <select 
                className="form-select"
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
              >
                {pricingPlans.map(p => (
                  <option key={p.planId} value={p.planId}>{p.name} — ₹{p.amount}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Select Free Desk ({availableSeats.length} available for this shift) *
            </label>
            <select
              className="form-select"
              required
              value={selectedSeatId}
              onChange={(e) => setSelectedSeatId(e.target.value)}
            >
              <option value="">-- Choose Desk Number --</option>
              {availableSeats.map(s => {
                const r = rooms.find(rm => rm.roomId === s.roomId);
                return (
                  <option key={s.seatId} value={s.seatId}>
                    Desk {s.seatNumber} ({r?.roomName.split('(')[0]})
                  </option>
                );
              })}
            </select>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '20px 0 16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            3. Payment Acceptance
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Payment Mode Collected</label>
              <select className="form-select" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                <option value="Cash">Physical Cash</option>
                <option value="Reception UPI QR">Reception Counter UPI QR</option>
                <option value="Direct Bank Transfer">Direct Bank Transfer / NEFT</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Amount Collected</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                ₹{selectedPlan.amount}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
            <UserPlus size={18} /> Complete Walk-in Admission & Print Pass
          </button>
        </form>
      </div>
    </div>
  );
}
