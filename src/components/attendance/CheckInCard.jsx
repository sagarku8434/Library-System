import React from 'react';
import { CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

export default function CheckInCard({ todayAttendance, activeBooking }) {
  const isCheckedIn = !!todayAttendance?.checkIn;
  const isCheckedOut = !!todayAttendance?.checkOut;

  return (
    <div className="card" style={{ 
      background: isCheckedIn && !isCheckedOut ? 'linear-gradient(135deg, #1e3a8a, #0f172a)' : 'white',
      color: isCheckedIn && !isCheckedOut ? 'white' : 'var(--text-main)',
      border: isCheckedIn && !isCheckedOut ? 'none' : '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            color: isCheckedIn && !isCheckedOut ? '#93c5fd' : 'var(--text-muted)'
          }}>
            Today's Attendance Status
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: '4px' }}>
            {isCheckedOut 
              ? 'Completed Session (Checked Out)' 
              : isCheckedIn 
                ? 'Currently Inside Reading Hall' 
                : 'Not Checked In Yet'}
          </h3>
        </div>

        {isCheckedIn && !isCheckedOut ? (
          <span className="badge" style={{ background: '#22c55e', color: 'white' }}>
            ● ACTIVE SESSION
          </span>
        ) : isCheckedOut ? (
          <span className="badge badge-neutral">SESSION CLOSED</span>
        ) : (
          <span className="badge badge-warning">AWAITING CHECK-IN</span>
        )}
      </div>

      {activeBooking ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '14px', 
          padding: '14px', 
          borderRadius: '10px',
          background: isCheckedIn && !isCheckedOut ? 'rgba(255, 255, 255, 0.08)' : '#f8fafc',
          border: isCheckedIn && !isCheckedOut ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: isCheckedIn && !isCheckedOut ? '#cbd5e1' : 'var(--text-muted)' }}>Assigned Desk</div>
            <div style={{ fontSize: '16px', fontWeight: '800' }}>Desk {activeBooking.seatNumber}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: isCheckedIn && !isCheckedOut ? '#cbd5e1' : 'var(--text-muted)' }}>Shift Window</div>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>{activeBooking.shiftName}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: isCheckedIn && !isCheckedOut ? '#cbd5e1' : 'var(--text-muted)' }}>Check-in Logged</div>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>{todayAttendance?.checkIn || '—'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: isCheckedIn && !isCheckedOut ? '#cbd5e1' : 'var(--text-muted)' }}>Check-out Logged</div>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>{todayAttendance?.checkOut || '—'}</div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ea580c', fontSize: '13px' }}>
          <AlertCircle size={16} />
          <span>No approved active booking for today. Please reserve a seat or check approval status.</span>
        </div>
      )}
    </div>
  );
}
