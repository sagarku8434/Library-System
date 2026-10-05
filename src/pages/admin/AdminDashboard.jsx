import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { 
  TrendingUp, 
  Armchair, 
  Users, 
  Inbox, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight,
  QrCode,
  DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    revenueStats, 
    bookings, 
    attendance, 
    seats, 
    approveBooking, 
    rejectBooking 
  } = useLibrary();

  const pendingBookings = bookings.filter(b => b.approvalStatus === 'pending');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === todayStr);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
          Business Operations Overview
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Real-time metrics, booking verifications, live attendance, and collections
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL COLLECTIONS</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              ₹{revenueStats.totalCollected.toLocaleString('en-IN')}
            </div>
            <span style={{ fontSize: '11px', color: '#16a34a' }}>Net: ₹{revenueStats.netRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#eff6ff', color: 'var(--primary)' }}>
            <Armchair size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>OCCUPANCY RATE</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              {revenueStats.totalOccupancyRate}%
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {revenueStats.activeSeatsCount} / {seats.length} seats active
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
            <Inbox size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>PENDING REQUESTS</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#d97706', fontFamily: 'var(--font-mono)' }}>
              {revenueStats.pendingRequestsCount}
            </div>
            <Link to="/admin/requests" style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}>
              Requires verification →
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#faf5ff', color: '#7c3aed' }}>
            <QrCode size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>TODAY'S ATTENDANCE</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#7c3aed', fontFamily: 'var(--font-mono)' }}>
              {todayAttendance.length}
            </div>
            <span style={{ fontSize: '11px', color: '#16a34a' }}>Students logged in</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Pending Approval Queue */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Inbox size={18} style={{ color: '#d97706' }} />
              Pending Verification Requests
            </h3>
            <Link to="/admin/requests" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
              View All ({pendingBookings.length})
            </Link>
          </div>

          {pendingBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={32} style={{ margin: '0 auto 8px', color: '#22c55e' }} />
              <p style={{ fontWeight: '600' }}>All bookings verified!</p>
              <span style={{ fontSize: '12px' }}>No requests waiting for review.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingBookings.slice(0, 3).map(b => (
                <div key={b.bookingId} style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{b.studentName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Desk {b.seatNumber} · {b.shiftName} · ₹{b.amount}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => approveBooking(b.bookingId)}
                      className="btn btn-success" 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => rejectBooking(b.bookingId)}
                      className="btn btn-danger" 
                      style={{ padding: '6px 10px', fontSize: '12px' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Attendance Activity */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: 'var(--primary)' }} />
              Today's Live Check-in Stream
            </h3>
            <Link to="/admin/attendance" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
              Audit Log →
            </Link>
          </div>

          {todayAttendance.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              <p>No check-ins logged yet today.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayAttendance.slice(0, 4).map(att => (
                <div key={att.attendanceId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '13px' }}>{att.studentName}</div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Desk {att.seatNumber} · In: {att.checkIn}</span>
                  </div>
                  <div>
                    {att.checkOut ? (
                      <span className="badge badge-neutral" style={{ fontSize: '11px' }}>Out: {att.checkOut}</span>
                    ) : (
                      <span className="badge badge-success" style={{ fontSize: '11px' }}>● In Hall</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
