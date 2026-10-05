import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Clock, Calendar, Sun, Sunset, Moon, Shield } from 'lucide-react';

export default function ShiftSelector({ selectedDate, setSelectedDate, selectedShift, setSelectedShift, selectedPlan, setSelectedPlan }) {
  const { shifts, pricingPlans } = useLibrary();

  const getShiftIcon = (shiftId) => {
    switch (shiftId) {
      case 'SHIFT_MORNING': return <Sun size={18} style={{ color: '#f59e0b' }} />;
      case 'SHIFT_AFTERNOON': return <Sun size={18} style={{ color: '#ea580c' }} />;
      case 'SHIFT_EVENING': return <Sunset size={18} style={{ color: '#8b5cf6' }} />;
      case 'SHIFT_FULL_DAY':
      case 'SHIFT_24X7': return <Moon size={18} style={{ color: '#2563eb' }} />;
      default: return <Clock size={18} />;
    }
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calendar size={18} style={{ color: 'var(--primary)' }} />
        Step 1: Choose Date & Timing Shift
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* Date Selector */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Booking Start Date</label>
          <input 
            type="date" 
            className="form-input" 
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Multi-day/monthly pass starts on this date
          </span>
        </div>

        {/* Pricing Plan Selector */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Membership Plan</label>
          <select 
            className="form-select"
            value={selectedPlan?.planId || ''}
            onChange={(e) => {
              const plan = pricingPlans.find(p => p.planId === e.target.value);
              if (plan) setSelectedPlan(plan);
            }}
          >
            {pricingPlans.map(plan => (
              <option key={plan.planId} value={plan.planId}>
                {plan.name} — ₹{plan.amount} ({plan.billingCycle})
              </option>
            ))}
          </select>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Snapshot pricing locked for subscription
          </span>
        </div>
      </div>

      {/* Shift Buttons Grid */}
      <div>
        <label className="form-label" style={{ marginBottom: '10px' }}>Select Study Shift Slot</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {shifts.map(shift => {
            const isSelected = selectedShift?.id === shift.id;
            return (
              <div 
                key={shift.id}
                onClick={() => setSelectedShift(shift)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--primary-light)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '13px' }}>
                    {getShiftIcon(shift.id)}
                    <span>{shift.name}</span>
                  </div>
                  {shift.isFullDay && (
                    <span className="badge badge-info" style={{ fontSize: '10px', padding: '1px 6px' }}>All Day</span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {shift.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
