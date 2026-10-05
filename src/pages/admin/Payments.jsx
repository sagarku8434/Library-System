import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { CreditCard, Search, Receipt, ShieldCheck } from 'lucide-react';

export default function Payments() {
  const { payments } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(p => 
    p.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.providerPaymentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Transactions & Cash Entries</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Complete audit trail of Razorpay online transactions and walk-in cash payments
          </p>
        </div>

        <input
          type="text"
          className="form-input"
          style={{ width: '260px' }}
          placeholder="Search receipt, student, ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Student</th>
                <th>Payment Mode</th>
                <th>Gateway Reference</th>
                <th>Timestamp</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(pay => (
                <tr key={pay.paymentId}>
                  <td style={{ fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                    {pay.receiptNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: '700' }}>{pay.studentName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ref: {pay.bookingId}</div>
                  </td>
                  <td style={{ fontSize: '13px' }}>
                    {pay.method}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {pay.providerPaymentId}
                  </td>
                  <td style={{ fontSize: '12px' }}>
                    {new Date(pay.paidAt).toLocaleString()}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
