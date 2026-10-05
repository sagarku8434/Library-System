import React from 'react';
import { ShieldCheck, Calendar, Clock, Armchair, CreditCard } from 'lucide-react';

export default function BookingSummary({ seat, shift, plan, startDate, onProceed, isLoading }) {
  if (!seat || !shift || !plan) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
        <Armchair size={36} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
        <p style={{ fontWeight: '600', fontSize: '15px' }}>Complete selections to view booking summary</p>
        <span style={{ fontSize: '13px' }}>Choose a shift and click on an available desk above.</span>
      </div>
    );
  }

  // Calculate endDate
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + (plan.durationDays || 30) - 1);
  const endDateStr = end.toISOString().split('T')[0];

  return (
    <div className="card" style={{ border: '2px solid var(--primary-light)', background: '#ffffff' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
        Booking & Fee Summary
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Armchair size={15} /> Assigned Seat
          </span>
          <span style={{ fontWeight: '800', color: '#0f172a' }}>Desk {seat.seatNumber}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={15} /> Study Shift
          </span>
          <span style={{ fontWeight: '700', color: '#0f172a' }}>{shift.name} ({shift.startTime} - {shift.endTime})</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} /> Validity Period
          </span>
          <span style={{ fontWeight: '600', color: '#0f172a' }}>{startDate} to {endDateStr} ({plan.durationDays} days)</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Base Subscription Fee</span>
          <span style={{ fontWeight: '700' }}>₹{plan.amount}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Wi-Fi & Locker Access</span>
          <span style={{ color: '#16a34a', fontWeight: '600' }}>FREE (Included)</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', fontSize: '18px' }}>
          <span style={{ fontWeight: '800', color: '#0f172a' }}>Total Amount Payable</span>
          <span style={{ fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>₹{plan.amount}</span>
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#475569' }}>
        <ShieldCheck size={20} style={{ color: '#2563eb', flexShrink: 0 }} />
        <span>Holding desk for 10 minutes upon proceeding. Secured with 256-bit bank encryption.</span>
      </div>

      <button
        onClick={onProceed}
        disabled={isLoading}
        className="btn btn-primary"
        style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '700' }}
      >
        <CreditCard size={18} />
        {isLoading ? 'Reserving Desk...' : `Proceed to Secure Checkout (₹${plan.amount})`}
      </button>
    </div>
  );
}
