import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import Modal from '../../components/common/Modal';
import { Armchair, Plus, Trash2, Power, Zap, Shield, CheckCircle2 } from 'lucide-react';

export default function SeatManagement() {
  const { seats, rooms, updateSeat, addSeat, removeSeat } = useLibrary();
  const [filterRoom, setFilterRoom] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSeatData, setNewSeatData] = useState({
    seatNumber: '',
    roomId: rooms[0]?.roomId || 'room-gf',
    hasSocket: true,
    hasCubicle: true,
    hasLamp: true
  });

  const filteredSeats = seats.filter(s => filterRoom === 'ALL' || s.roomId === filterRoom);

  const handleToggleStatus = (seat) => {
    const nextStatus = seat.activeStatus === 'active' ? 'disabled' : 'active';
    updateSeat(seat.seatId, { activeStatus: nextStatus });
  };

  const handleCreateSeat = (e) => {
    e.preventDefault();
    if (!newSeatData.seatNumber) return;

    const newSeat = {
      seatId: newSeatData.seatNumber.toUpperCase(),
      seatNumber: newSeatData.seatNumber.toUpperCase(),
      roomId: newSeatData.roomId,
      activeStatus: 'active',
      hasSocket: newSeatData.hasSocket,
      hasCubicle: newSeatData.hasCubicle,
      hasLamp: newSeatData.hasLamp
    };

    addSeat(newSeat);
    setShowAddModal(false);
    setNewSeatData({
      seatNumber: '',
      roomId: rooms[0]?.roomId || 'room-gf',
      hasSocket: true,
      hasCubicle: true,
      hasLamp: true
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Desk & Capacity Management</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Configure {seats.length} total study desks across 2 reading halls
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="form-select"
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
          >
            <option value="ALL">All Rooms ({seats.length} Desks)</option>
            {rooms.map(r => (
              <option key={r.roomId} value={r.roomId}>{r.roomName}</option>
            ))}
          </select>

          <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ fontSize: '13px' }}>
            <Plus size={16} /> Add New Desk
          </button>
        </div>
      </div>

      {/* Grid of Seats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
        {filteredSeats.map(seat => {
          const room = rooms.find(r => r.roomId === seat.roomId);
          const isActive = seat.activeStatus === 'active';

          return (
            <div key={seat.seatId} className="card" style={{ opacity: isActive ? 1 : 0.6, border: isActive ? '1px solid var(--border)' : '1px dashed #cbd5e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isActive ? 'var(--primary-light)' : '#f1f5f9', color: isActive ? 'var(--primary)' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Armchair size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '800' }}>Desk {seat.seatNumber}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{room?.roomName.split('(')[0]}</span>
                  </div>
                </div>

                <span className={isActive ? 'badge badge-success' : 'badge badge-neutral'}>
                  {seat.activeStatus}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569', marginBottom: '16px' }}>
                {seat.hasSocket && <span>⚡ Socket</span>}
                {seat.hasCubicle && <span>🛡️ Cubicle</span>}
                {seat.hasLamp && <span>💡 LED Lamp</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                <button
                  onClick={() => handleToggleStatus(seat)}
                  className="btn btn-secondary"
                  style={{ fontSize: '12px', padding: '6px 10px' }}
                >
                  <Power size={13} /> {isActive ? 'Disable Seat' : 'Enable Seat'}
                </button>

                <button
                  onClick={() => removeSeat(seat.seatId)}
                  title="Remove Desk"
                  style={{ color: '#ef4444', padding: '6px' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Desk Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Register New Study Desk"
      >
        <form onSubmit={handleCreateSeat}>
          <div className="form-group">
            <label className="form-label">Desk Number / Code *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. A31 or C01"
              value={newSeatData.seatNumber}
              onChange={(e) => setNewSeatData({ ...newSeatData, seatNumber: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assign to Hall / Room</label>
            <select
              className="form-select"
              value={newSeatData.roomId}
              onChange={(e) => setNewSeatData({ ...newSeatData, roomId: e.target.value })}
            >
              {rooms.map(r => (
                <option key={r.roomId} value={r.roomId}>{r.roomName}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={newSeatData.hasSocket}
                onChange={(e) => setNewSeatData({ ...newSeatData, hasSocket: e.target.checked })}
              />
              Power Socket
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={newSeatData.hasCubicle}
                onChange={(e) => setNewSeatData({ ...newSeatData, hasCubicle: e.target.checked })}
              />
              Acoustic Cubicle
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Desk to Inventory
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
