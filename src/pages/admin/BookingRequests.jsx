import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import Modal from '../../components/common/Modal';
import { Inbox, CheckCircle2, XCircle, AlertCircle, Shield, FileText } from 'lucide-react';

export default function BookingRequests() {
  const { bookings, approveBooking, rejectBooking } = useLibrary();
  const [rejectingBooking, setRejectingBooking] = useState(null);
  const [rejectReason, setRejectReason] = useState('Document verification incomplete or mismatch');

  const pendingRequests = bookings.filter(b => b.approvalStatus === 'pending');

  const handleConfirmReject = () => {
    if (rejectingBooking) {
      rejectBooking(rejectingBooking.bookingId, rejectReason);
      setRejectingBooking(null);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Pending Booking Requests</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Review student admissions, payment verification, and activate dynamic attendance QR passes
        </p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
          <CheckCircle2 size={44} style={{ color: '#22c55e', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Zero Pending Requests</h3>
          <p style={{ fontSize: '14px', marginTop: '6px' }}>All online admissions have been reviewed and approved.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pendingRequests.map(b => (
            <div key={b.bookingId} className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                      {b.studentName}
                    </h3>
                    <span className="badge badge-warning">Awaiting Approval</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    ID: {b.studentId} · Phone: {b.studentPhone} · Email: {b.studentEmail}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => approveBooking(b.bookingId)}
                    className="btn btn-success"
                    style={{ fontSize: '13px', padding: '8px 18px' }}
                  >
                    <CheckCircle2 size={16} /> Approve & Enable QR
                  </button>
                  <button
                    onClick={() => setRejectingBooking(b)}
                    className="btn btn-danger"
                    style={{ fontSize: '13px', padding: '8px 16px' }}
                  >
                    <XCircle size={16} /> Reject & Refund
                  </button>
                </div>
              </div>

              {/* Booking Specifications Box */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Desk:</span>
                  <div style={{ fontWeight: '800', color: 'var(--primary)' }}>Desk {b.seatNumber} ({b.roomName})</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Shift Window:</span>
                  <div style={{ fontWeight: '700' }}>{b.shiftName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Subscription Validity:</span>
                  <div style={{ fontWeight: '600' }}>{b.startDate} to {b.endDate}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Payment Verified:</span>
                  <div style={{ fontWeight: '800', color: '#16a34a', fontFamily: 'var(--font-mono)' }}>₹{b.amount} (Razorpay)</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Modal
        isOpen={!!rejectingBooking}
        onClose={() => setRejectingBooking(null)}
        title="Reject Booking Request & Issue Refund"
      >
        {rejectingBooking && (
          <div>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px' }}>
              Rejecting this request will release Desk <strong>{rejectingBooking.seatNumber}</strong> back to public availability and flag payment <strong>₹{rejectingBooking.amount}</strong> for immediate gateway refund.
            </p>

            <div className="form-group">
              <label className="form-label">Reason for Rejection (Visible to student)</label>
              <select
                className="form-select"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              >
                <option value="Document verification incomplete or mismatch">Document verification incomplete or mismatch</option>
                <option value="Capacity constraint / Desk maintenance scheduled">Capacity constraint / Desk maintenance scheduled</option>
                <option value="Student requested slot reallocation">Student requested slot reallocation</option>
                <option value="Suspicious duplicate reservation">Suspicious duplicate reservation</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setRejectingBooking(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleConfirmReject} className="btn btn-danger">
                Confirm Rejection & Refund
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
