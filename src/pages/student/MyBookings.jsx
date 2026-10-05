import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { Armchair, Calendar, Clock, Receipt, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings } = useLibrary();

  const studentBookings = bookings.filter(b => b.studentId === user?.userId);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>My Bookings & Passes</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Historical and active desk reservations for {user?.name}
          </p>
        </div>
        <Link to="/seats" className="btn btn-primary" style={{ fontSize: '13px' }}>
          + New Desk Reservation
        </Link>
      </div>

      {studentBookings.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          <Armchair size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
          <h3 style={{ fontSize: '18px', fontWeight: '700' }}>No Bookings Found</h3>
          <p style={{ margin: '8px 0 16px', fontSize: '14px' }}>You haven't reserved any study desks yet.</p>
          <Link to="/seats" className="btn btn-primary">Browse Available Desks</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {studentBookings.map((b) => (
            <div key={b.bookingId} className="card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Armchair size={26} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                      Desk {b.seatNumber}
                    </span>
                    {b.approvalStatus === 'approved' ? (
                      <span className="badge badge-success">Approved</span>
                    ) : b.approvalStatus === 'pending' ? (
                      <span className="badge badge-warning">Pending Admin Review</span>
                    ) : (
                      <span className="badge badge-danger">Rejected / Refunded</span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {b.roomName} · {b.planName}
                  </div>
                </div>
              </div>

              {/* Shift & Dates */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>SHIFT</span>
                  <strong style={{ color: '#0f172a' }}>{b.shiftName}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>PERIOD</span>
                  <strong style={{ color: '#0f172a' }}>{b.startDate} to {b.endDate}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>FEE PAID</span>
                  <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>₹{b.amount}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>ATTENDANCE QR</span>
                  <strong style={{ color: b.attendanceEnabled ? '#16a34a' : '#ea580c' }}>
                    {b.attendanceEnabled ? '✓ Enabled' : 'Disabled'}
                  </strong>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/student/payments" className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  <Receipt size={14} /> Receipt
                </Link>
                <Link to="/student/renew" className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  <RefreshCw size={14} /> Renew
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
