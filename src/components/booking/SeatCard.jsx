import React from 'react';
import { Armchair, Zap, Shield, Sparkles, MapPin } from 'lucide-react';

export default function SeatCard({ seat, room }) {
  if (!seat) return null;

  return (
    <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Armchair size={26} />
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
            Desk {seat.seatNumber}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {room?.roomName || 'Ground Floor Socrates Hall'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span className="badge badge-neutral" style={{ fontSize: '12px' }}>
          <Zap size={12} style={{ color: '#eab308' }} /> High-Speed AC Socket
        </span>
        <span className="badge badge-neutral" style={{ fontSize: '12px' }}>
          <Shield size={12} style={{ color: 'var(--primary)' }} /> Acoustic Privacy Partition
        </span>
        <span className="badge badge-success" style={{ fontSize: '12px' }}>
          ✓ Verified Active
        </span>
      </div>
    </div>
  );
}
