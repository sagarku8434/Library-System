import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { CalendarDays, Search, Filter } from 'lucide-react';

export default function AllBookings() {
  const { bookings } = useLibrary();
  const [filterShift, setFilterShift] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(b => {
    if (filterShift !== 'ALL' && b.shiftId !== filterShift) return false;
    if (filterStatus !== 'ALL' && b.approvalStatus !== filterStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        b.studentName.toLowerCase().includes(q) ||
        b.seatNumber.toLowerCase().includes(q) ||
        b.bookingId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Master Booking Ledger</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Searchable log of all past, active, and walk-in reservations
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            style={{ width: '220px' }}
            placeholder="Search student, desk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Student</th>
                <th>Desk & Room</th>
                <th>Shift</th>
                <th>Validity Dates</th>
                <th>Fee</th>
                <th>Channel</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(b => (
                <tr key={b.bookingId}>
                  <td style={{ fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                    {b.bookingId}
                  </td>
                  <td>
                    <div style={{ fontWeight: '700' }}>{b.studentName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.studentPhone}</div>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontWeight: '800' }}>
                      Desk {b.seatNumber}
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.roomName.split('(')[0]}</div>
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: '600' }}>
                    {b.shiftName}
                  </td>
                  <td style={{ fontSize: '13px' }}>
                    {b.startDate} to {b.endDate}
                  </td>
                  <td style={{ fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                    ₹{b.amount}
                  </td>
                  <td>
                    <span className="badge" style={{ background: b.bookingType === 'offline' ? '#fef3c7' : '#e0e7ff', color: b.bookingType === 'offline' ? '#92400e' : '#3730a3' }}>
                      {b.bookingType || 'online'}
                    </span>
                  </td>
                  <td>
                    {b.approvalStatus === 'approved' ? (
                      <span className="badge badge-success">Approved</span>
                    ) : b.approvalStatus === 'pending' ? (
                      <span className="badge badge-warning">Pending</span>
                    ) : (
                      <span className="badge badge-danger">Rejected</span>
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
