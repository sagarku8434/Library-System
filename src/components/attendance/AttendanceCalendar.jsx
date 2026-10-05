import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

export default function AttendanceCalendar({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
        <Calendar size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
        <p style={{ fontWeight: '600' }}>No attendance records logged yet.</p>
        <span style={{ fontSize: '13px' }}>Scan the entrance QR code to begin logging study sessions.</span>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Attendance History & Logs</h3>
        <span className="badge badge-info">{logs.length} Sessions Logged</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Desk</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Verification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.attendanceId}>
                <td style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>{log.date}</td>
                <td>
                  <span className="badge badge-neutral" style={{ fontWeight: '700' }}>
                    Desk {log.seatNumber}
                  </span>
                </td>
                <td style={{ color: '#166534', fontWeight: '600' }}>{log.checkIn}</td>
                <td style={{ color: '#64748b' }}>{log.checkOut || <span style={{ color: '#d97706' }}>In Progress...</span>}</td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} color="#22c55e" /> {log.method || 'Dynamic QR'}
                  </span>
                </td>
                <td>
                  <span className="badge badge-success">Present</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
