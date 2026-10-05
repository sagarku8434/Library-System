import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import Modal from '../../components/common/Modal';
import { Receipt, Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default function MyPayments() {
  const { user } = useAuth();
  const { payments, bookings, settings } = useLibrary();

  const studentPayments = payments.filter(p => p.studentId === user?.userId);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const selectedBooking = bookings.find(b => b.bookingId === selectedPayment?.bookingId);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>My Payments & Invoices</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Verified Razorpay merchant receipts and transaction logs
        </p>
      </div>

      {studentPayments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <Receipt size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
          <h3>No Payment Records Found</h3>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt Number</th>
                  <th>Booking Ref</th>
                  <th>Date & Time</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentPayments.map((pay) => (
                  <tr key={pay.paymentId}>
                    <td style={{ fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                      {pay.receiptNumber}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                      {pay.bookingId}
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {new Date(pay.paidAt).toLocaleDateString()}
                    </td>
                    <td style={{ fontSize: '13px' }}>
                      {pay.method}
                    </td>
                    <td style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                      ₹{pay.amount}
                    </td>
                    <td>
                      {pay.status === 'success' ? (
                        <span className="badge badge-success">Success</span>
                      ) : pay.status === 'refunded' ? (
                        <span className="badge badge-danger">Refunded</span>
                      ) : (
                        <span className="badge badge-warning">{pay.status}</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedPayment(pay)}
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '6px 12px' }}
                      >
                        <Receipt size={13} /> View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      <Modal
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
        title="Official Library Payment Receipt"
        maxWidth="580px"
      >
        {selectedPayment && (
          <div className="printable-receipt" style={{ padding: '4px' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>{settings.libraryName}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{settings.address}</p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Contact: {settings.ownerPhone} · Merchant: {settings.razorpayMerchantId}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px' }}>
              <div>
                <div><strong>Receipt No:</strong> {selectedPayment.receiptNumber}</div>
                <div><strong>Date:</strong> {new Date(selectedPayment.paidAt).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div><strong>Student:</strong> {selectedPayment.studentName}</div>
                <div><strong>Student ID:</strong> {selectedPayment.studentId}</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '14px', marginBottom: '20px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Booking Reference:</span>
                <strong>{selectedPayment.bookingId}</strong>
              </div>
              {selectedBooking && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Assigned Desk:</span>
                    <strong>Desk {selectedBooking.seatNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Plan:</span>
                    <strong>{selectedBooking.planName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Validity:</span>
                    <strong>{selectedBooking.startDate} to {selectedBooking.endDate}</strong>
                  </div>
                </>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Payment Mode:</span>
                <span>{selectedPayment.method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Provider Transaction ID:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedPayment.providerPaymentId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '10px', fontSize: '16px', fontWeight: '800' }}>
                <span>Total Amount Paid:</span>
                <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>₹{selectedPayment.amount}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#16a34a' }}>
                <CheckCircle2 size={16} /> Verified Computer-Generated Slip
              </div>
              <button onClick={handlePrint} className="btn btn-primary" style={{ fontSize: '13px' }}>
                <Printer size={15} /> Print / Save as PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
