import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { RefreshCw, Armchair, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RenewBooking() {
  const { user } = useAuth();
  const { bookings, pricingPlans, shifts, rooms } = useLibrary();
  const navigate = useNavigate();

  const studentBookings = bookings.filter(b => b.studentId === user?.userId && b.approvalStatus === 'approved');
  const [selectedBookingId, setSelectedBookingId] = useState(studentBookings[0]?.bookingId || '');
  const [selectedPlanId, setSelectedPlanId] = useState(pricingPlans[1]?.planId || pricingPlans[0]?.planId);

  const selectedBooking = studentBookings.find(b => b.bookingId === selectedBookingId);
  const selectedPlan = pricingPlans.find(p => p.planId === selectedPlanId);
  const selectedShift = shifts.find(s => s.id === selectedBooking?.shiftId) || shifts[0];
  const selectedRoom = rooms.find(r => r.roomId === selectedBooking?.roomId);

  const handleProceedRenew = () => {
    if (!selectedBooking || !selectedPlan) return;

    // Start next day after current booking ends
    const nextStart = new Date(selectedBooking.endDate);
    nextStart.setDate(nextStart.getDate() + 1);
    const startDateStr = nextStart.toISOString().split('T')[0];

    navigate('/checkout', {
      state: {
        seat: { seatId: selectedBooking.seatId, seatNumber: selectedBooking.seatNumber, roomId: selectedBooking.roomId },
        room: selectedRoom,
        shift: selectedShift,
        plan: selectedPlan,
        startDate: startDateStr
      }
    });
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Renew or Upgrade Study Membership</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Retain your reserved desk for the subsequent month or switch shift timings
        </p>
      </div>

      {studentBookings.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <Armchair size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
          <h3>No Active Bookings to Renew</h3>
          <p style={{ margin: '8px 0 16px' }}>Reserve a seat first to enable monthly renewals.</p>
          <button onClick={() => navigate('/seats')} className="btn btn-primary">
            Browse Desks
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="form-group">
            <label className="form-label">Select Active Seat to Renew</label>
            <select
              className="form-select"
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
            >
              {studentBookings.map(b => (
                <option key={b.bookingId} value={b.bookingId}>
                  Desk {b.seatNumber} ({b.shiftName}) — Currently ends {b.endDate}
                </option>
              ))}
            </select>
          </div>

          {selectedBooking && (
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '20px', fontSize: '13px' }}>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a', marginBottom: '6px' }}>
                Retaining: Desk {selectedBooking.seatNumber}
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                Current Cycle ends: <strong>{selectedBooking.endDate}</strong>
              </div>
              <div style={{ color: '#16a34a', marginTop: '6px', fontWeight: '600' }}>
                ✓ Renewal guarantees priority desk reservation without public release.
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Select Renewal Duration / Plan</label>
            <select
              className="form-select"
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
            >
              {pricingPlans.map(p => (
                <option key={p.planId} value={p.planId}>
                  {p.name} — ₹{p.amount} ({p.durationDays} days)
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Renewal Fee:</span>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                ₹{selectedPlan?.amount}
              </div>
            </div>

            <button onClick={handleProceedRenew} className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
              <RefreshCw size={16} /> Proceed to Renewal Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
