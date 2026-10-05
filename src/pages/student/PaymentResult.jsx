import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Receipt, ArrowRight, Clock, ShieldCheck, Printer } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

export default function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useLibrary();

  const state = location.state;
  const booking = state?.booking;
  const payment = state?.payment;

  if (!booking || !payment) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '440px', margin: '0 auto', padding: '30px' }}>
          <h3>No Transaction Found</h3>
          <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>Please visit your dashboard to view payment history.</p>
          <Link to="/student/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        {/* Printable Receipt Card */}
        <div className="card printable-receipt" style={{ padding: '36px', border: '2px solid #86efac', background: '#ffffff', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>Payment Verified & Received</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Receipt Ref: <strong>{payment.receiptNumber}</strong> · Gateway Order: {payment.providerOrderId}
            </p>
          </div>

          {/* Pending Approval Notice */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Clock size={18} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: '#92400e', lineHeight: '1.4' }}>
              <strong>Admin Approval Window:</strong> Your desk is reserved! Library administration conducts a quick ID verification check. Once approved, dynamic QR attendance will automatically activate for your pass.
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '800' }}>{settings.libraryName}</span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{settings.address}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-success">PAID via Razorpay</span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{new Date(payment.paidAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Student Name:</span>
                <div style={{ fontWeight: '700' }}>{booking.studentName}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Desk:</span>
                <div style={{ fontWeight: '800', color: 'var(--primary)' }}>Desk {booking.seatNumber}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Study Shift:</span>
                <div style={{ fontWeight: '600' }}>{booking.shiftName}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Plan & Validity:</span>
                <div style={{ fontWeight: '600' }}>{booking.startDate} to {booking.endDate}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Transaction Reference:</span>
                <div style={{ fontFamily: 'var(--font-mono)' }}>{payment.providerPaymentId}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>₹{payment.amount}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Merchant ID: {settings.razorpayMerchantId}</span>
            <button onClick={handlePrint} className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
              <Printer size={14} /> Print / Download Receipt
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <Link to="/student/dashboard" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Go to Student Dashboard <ArrowRight size={16} />
          </Link>
          <Link to="/student/bookings" className="btn btn-outline" style={{ padding: '12px 20px' }}>
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
