import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import Modal from '../../components/common/Modal';
import { QrCode, Edit3, CheckCircle2, Clock, Calendar, RefreshCw } from 'lucide-react';

export default function Attendance() {
  const { attendance, rotatingQr, manualCorrectAttendance } = useLibrary();
  const [selectedAtt, setSelectedAtt] = useState(null);
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');

  const handleStartCorrection = (att) => {
    setSelectedAtt(att);
    setEditCheckIn(att.checkIn || '');
    setEditCheckOut(att.checkOut || '');
  };

  const handleSaveCorrection = () => {
    if (selectedAtt) {
      manualCorrectAttendance(selectedAtt.attendanceId, {
        checkIn: editCheckIn,
        checkOut: editCheckOut,
        method: 'Admin Manual Audit'
      });
      setSelectedAtt(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Live Attendance & Daily Audit</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Real-time dynamic QR check-ins with administrative audit override
          </p>
        </div>

        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={14} className="spin-slow" style={{ color: '#0284c7' }} />
          <span>Reception dynamic token: <strong style={{ fontFamily: 'var(--font-mono)' }}>{rotatingQr.token.substring(0, 16)}...</strong></span>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Assigned Desk</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Method</th>
                <th>Status</th>
                <th>Correction</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(att => (
                <tr key={att.attendanceId}>
                  <td style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                    {att.date}
                  </td>
                  <td>
                    <div style={{ fontWeight: '700' }}>{att.studentName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{att.studentId}</div>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontWeight: '800' }}>
                      Desk {att.seatNumber}
                    </span>
                  </td>
                  <td style={{ color: '#16a34a', fontWeight: '600' }}>
                    {att.checkIn || '—'}
                  </td>
                  <td style={{ color: '#64748b' }}>
                    {att.checkOut || <span style={{ color: '#d97706', fontSize: '12px' }}>● Inside Hall</span>}
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {att.method || 'Dynamic QR'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Present</span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStartCorrection(att)}
                      className="btn btn-secondary"
                      style={{ fontSize: '12px', padding: '5px 10px' }}
                    >
                      <Edit3 size={13} /> Correct
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Correction Modal */}
      <Modal
        isOpen={!!selectedAtt}
        onClose={() => setSelectedAtt(null)}
        title="Admin Attendance Audit Correction"
      >
        {selectedAtt && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Modifying attendance log for <strong>{selectedAtt.studentName}</strong> on {selectedAtt.date} (Desk {selectedAtt.seatNumber}).
            </p>

            <div className="form-group">
              <label className="form-label">Check-in Timestamp</label>
              <input
                type="text"
                className="form-input"
                value={editCheckIn}
                onChange={(e) => setEditCheckIn(e.target.value)}
                placeholder="e.g. 06:15 AM"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Check-out Timestamp</label>
              <input
                type="text"
                className="form-input"
                value={editCheckOut}
                onChange={(e) => setEditCheckOut(e.target.value)}
                placeholder="e.g. 11:45 AM"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setSelectedAtt(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleSaveCorrection} className="btn btn-primary">Save Correction Log</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
