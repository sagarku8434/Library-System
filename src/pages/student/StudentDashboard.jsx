import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import CheckInCard from '../../components/attendance/CheckInCard';
import { 
  Armchair, 
  Calendar, 
  Clock, 
  QrCode, 
  Receipt, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { bookings, attendance, payments } = useLibrary();

  // Find active approved or pending booking for this student
  const studentBookings = bookings.filter(b => b.studentId === user?.userId);
  const activeBooking = studentBookings.find(b => b.approvalStatus === 'approved') || studentBookings[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.studentId === user?.userId && a.date === todayStr);
  const studentPayments = payments.filter(p => p.studentId === user?.userId);

  // Calculate days remaining
  let daysRemaining = 0;
  if (activeBooking?.endDate) {
    const end = new Date(activeBooking.endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    daysRemaining = Math.max(0, diff);
  }

  return (
    <div>
      {/* Top Today Status Card */}
      <div style={{ marginBottom: '28px' }}>
        <CheckInCard todayAttendance={todayAttendance} activeBooking={activeBooking} />
      </div>

      {/* Grid of Key Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '30px' }}>
        {/* Active Desk & Membership Pass */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Active Study Pass</h3>
            {activeBooking?.approvalStatus === 'approved' ? (
              <span className="badge badge-success">✓ Approved & Active</span>
            ) : activeBooking?.approvalStatus === 'pending' ? (
              <span className="badge badge-warning">Awaiting Admin Verification</span>
            ) : (
              <span className="badge badge-neutral">No Active Pass</span>
            )}
          </div>

          {activeBooking ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '18px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Armchair size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                    Desk {activeBooking.seatNumber}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {activeBooking.roomName}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', marginBottom: '20px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Shift Slot:</span>
                  <div style={{ fontWeight: '700' }}>{activeBooking.shiftName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Validity Remaining:</span>
                  <div style={{ fontWeight: '700', color: daysRemaining < 5 ? '#dc2626' : '#16a34a' }}>
                    {daysRemaining} Days Left
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Valid Until:</span>
                  <div style={{ fontWeight: '600' }}>{activeBooking.endDate}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Attendance QR:</span>
                  <div style={{ fontWeight: '700', color: activeBooking.attendanceEnabled ? '#16a34a' : '#d97706' }}>
                    {activeBooking.attendanceEnabled ? 'Enabled' : 'Pending Approval'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/student/attendance" className="btn btn-primary" style={{ flex: 1, fontSize: '13px' }}>
                  <QrCode size={15} /> Open QR Scanner
                </Link>
                <Link to="/student/renew" className="btn btn-secondary" style={{ fontSize: '13px' }}>
                  <RefreshCw size={14} /> Renew Pass
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>You do not have any active desk reservations.</p>
              <Link to="/seats" className="btn btn-primary">
                Explore Available Desks
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions & Recent Payment */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Recent Payment Receipt</h3>

            {studentPayments.length > 0 ? (
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px' }}>{studentPayments[0].receiptNumber}</span>
                  <span className="badge badge-success">₹{studentPayments[0].amount} Paid</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Method: {studentPayments[0].method}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Date: {new Date(studentPayments[0].paidAt).toLocaleDateString()}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <Link to="/student/payments" className="btn btn-outline" style={{ width: '100%', fontSize: '12px', padding: '6px' }}>
                    <Receipt size={14} /> View All Receipts
                  </Link>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>No payments logged yet.</p>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
              Quick Navigation
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Link to="/student/bookings" className="btn btn-secondary" style={{ fontSize: '12px' }}>
                My Bookings ({studentBookings.length})
              </Link>
              <Link to="/student/profile" className="btn btn-secondary" style={{ fontSize: '12px' }}>
                Profile & ID Doc
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
