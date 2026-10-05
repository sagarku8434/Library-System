import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Zap, Shield, Sparkles, Info } from 'lucide-react';

export default function SeatMap({ selectedDate, selectedShift, selectedSeat, onSelectSeat }) {
  const { rooms, seats, checkSeatAvailability } = useLibrary();
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.roomId || 'room-gf');

  const filteredSeats = seats.filter(s => s.roomId === activeRoomId);
  const activeRoom = rooms.find(r => r.roomId === activeRoomId);

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
            Step 2: Choose Your Architectural Desk
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Real-time conflict-safe availability for {selectedDate} ({selectedShift?.name})
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px', gap: '4px' }}>
          {rooms.map(room => (
            <button
              key={room.roomId}
              onClick={() => setActiveRoomId(room.roomId)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                background: activeRoomId === room.roomId ? 'white' : 'transparent',
                color: activeRoomId === room.roomId ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: activeRoomId === room.roomId ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {room.roomName.split(' ')[2] || room.floor} ({room.floor})
            </button>
          ))}
        </div>
      </div>

      {/* Facilities & Amenities Pill in Room */}
      {activeRoom && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>Room Features:</span>
          {activeRoom.facilities.map((fac, idx) => (
            <span key={idx} className="badge badge-neutral" style={{ fontSize: '11px', background: 'white' }}>
              ✓ {fac}
            </span>
          ))}
        </div>
      )}

      {/* Visual Status Legend */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '16px', 
        alignItems: 'center', 
        paddingBottom: '16px', 
        borderBottom: '1px solid var(--border)', 
        marginBottom: '20px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#f0fdf4', border: '2px solid #22c55e' }}></span>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#eff6ff', border: '2px solid #2563eb' }}></span>
          <span>Selected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#fffbeb', border: '2px solid #f59e0b' }}></span>
          <span>Held (Checkout in progress)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#fef2f2', border: '2px solid #ef4444' }}></span>
          <span>Occupied / Booked</span>
        </div>
      </div>

      {/* Seat Map Grid */}
      <div className="seat-map-grid">
        {filteredSeats.map(seat => {
          const status = checkSeatAvailability(seat.seatId, selectedDate, selectedShift?.id);
          const isSelected = selectedSeat?.seatId === seat.seatId;
          const effectiveClass = isSelected ? 'selected' : status;

          return (
            <div
              key={seat.seatId}
              className={`seat-item ${effectiveClass}`}
              onClick={() => {
                if (status === 'available' || isSelected) {
                  onSelectSeat(seat);
                }
              }}
              title={`Desk ${seat.seatNumber} | ${status.toUpperCase()} | Socket: Yes | Cubicle: ${seat.hasCubicle ? 'Yes' : 'No'}`}
            >
              <div style={{ fontSize: '13px', fontWeight: '800' }}>{seat.seatNumber}</div>
              <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                {seat.hasSocket && <Zap size={10} style={{ opacity: 0.7 }} />}
                {seat.hasCubicle && <Shield size={10} style={{ opacity: 0.7 }} />}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <Info size={14} />
        <span>Desks feature dedicated power sockets, sound-baffled partition panels, and ergonomic lumbar support chairs.</span>
      </div>
    </div>
  );
}
