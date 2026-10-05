import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, CreditCard, Lock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBooking, settings } = useLibrary();

  const bookingState = location.state;
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  if (!bookingState?.seat || !bookingState?.plan) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 20px' }}>
          <AlertCircle size={40} style={{ color: '#ef4444', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '800' }}>No Active Desk Selection</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '10px 0 20px' }}>
            Please select an available desk from the live seat map before checking out.
          </p>
          <button onClick={() => navigate('/seats')} className="btn btn-primary">
            Go to Seat Selection
          </button>
        </div>
      </div>
    );
  }

  const { seat, room, shift, plan, startDate } = bookingState;

  // Calculate End Date
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + (plan.durationDays || 30) - 1);
  const endDate = end.toISOString().split('T')[0];

  const handlePayNow = () => {
    setIsProcessing(true);
    setError(null);

    // Simulate Razorpay Gateway Interaction
    setTimeout(() => {
      const orderId = `order_${Math.random().toString(36).substring(2, 10)}`;
      const paymentId = `pay_${Math.random().toString(36).substring(2, 12)}`;

      const bookingPayload = {
        studentId: user?.userId || 'USR_GUEST',
        studentName: user?.name || 'Walk-in Student',
        studentPhone: user?.phone || '9876543210',
        studentEmail: user?.email || 'student@athena.com',
        seatId: seat.seatId,
        seatNumber: seat.seatNumber,
        roomId: seat.roomId,
        roomName: room?.roomName || 'Ground Floor Main Hall',
        planId: plan.planId,
        planName: plan.name,
        shiftId: shift.id,
        shiftName: shift.name,
        startDate: startDate,
        endDate: endDate,
        amount: plan.amount,
        isOffline: false
      };

      const paymentPayload = {
        orderId: orderId,
        paymentId: paymentId,
        method: paymentMethod === 'upi' ? 'Razorpay UPI (Fast QR)' : 'Razorpay NetBanking / Card'
      };

      const result = createBooking(bookingPayload, paymentPayload);

      setIsProcessing(false);
      if (result.success) {
        navigate('/payment-status', {
          state: {
            booking: result.booking,
            payment: result.payment
          }
        });
      } else {
        setError('Payment verification failed. Please try again.');
      }
    }, 1200);
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <button onClick={() => navigate('/seats')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '20px' }}>
          <ArrowLeft size={16} /> Back to Seat Selection
        </button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Secure Checkout & Payment
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>
          Merchant: <strong>{settings.libraryName}</strong> (Razorpay Gateway Integration)
        </p>

        {error && (
          <div style={{ padding: '14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Col 1: Booking Details & Payment Options */}
          <div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '16px' }}>
                Select Payment Mode
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '14px', 
                  borderRadius: '10px', 
                  border: `2px solid ${paymentMethod === 'upi' ? 'var(--primary)' : 'var(--border)'}`, 
                  background: paymentMethod === 'upi' ? 'var(--primary-light)' : 'white',
                  cursor: 'pointer' 
                }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'upi'} 
                    onChange={() => setPaymentMethod('upi')} 
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>UPI (Google Pay / PhonePe / Paytm)</div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Zero transaction fees · Instant verification</span>
                  </div>
                </label>

                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '14px', 
                  borderRadius: '10px', 
                  border: `2px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--border)'}`, 
                  background: paymentMethod === 'card' ? 'var(--primary-light)' : 'white',
                  cursor: 'pointer' 
                }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')} 
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>Debit / Credit Card & NetBanking</div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>All major Indian banks supported</span>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
                Payments settle directly into the library owner's merchant account. Your payment details are protected with 256-bit SSL encryption.
              </div>
            </div>
          </div>

          {/* Col 2: Order Snapshot Card */}
          <div className="card">
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Order Snapshot</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Desk Number</span>
                <span style={{ fontWeight: '800', color: 'var(--primary)' }}>Desk {seat.seatNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Study Shift</span>
                <span style={{ fontWeight: '700' }}>{shift.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subscription Plan</span>
                <span style={{ fontWeight: '600' }}>{plan.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Start Date</span>
                <span style={{ fontWeight: '600' }}>{startDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Valid Until</span>
                <span style={{ fontWeight: '600' }}>{endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', fontSize: '18px' }}>
                <span style={{ fontWeight: '800' }}>Total Payable</span>
                <span style={{ fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>₹{plan.amount}</span>
              </div>
            </div>

            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '16px' }}
            >
              <CreditCard size={18} />
              {isProcessing ? 'Verifying with Razorpay...' : `Pay ₹${plan.amount} via Razorpay`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
