import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingCard({ plan, isSelected, onSelect }) {
  return (
    <div 
      className="card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: isSelected ? '2px solid var(--primary)' : plan.popular ? '2px solid #38bdf8' : '1px solid var(--border)',
        transform: isSelected ? 'scale(1.02)' : 'none',
        transition: 'all 0.25s'
      }}
    >
      {plan.popular && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '20px',
          background: 'linear-gradient(135deg, #2563eb, #0284c7)',
          color: 'white',
          fontSize: '11px',
          fontWeight: '700',
          padding: '3px 12px',
          borderRadius: '9999px',
          boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Sparkles size={11} /> MOST POPULAR
        </div>
      )}

      <div>
        <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          {plan.name}
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px', minHeight: '38px' }}>
          {plan.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
          <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            ₹{plan.amount}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            /{plan.billingCycle}
          </span>
        </div>

        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '18px' }} />

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', fontSize: '13px' }}>
          {plan.features?.map((feat, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onSelect(plan)}
        className={isSelected ? 'btn btn-primary' : 'btn btn-outline'}
        style={{ width: '100%' }}
      >
        {isSelected ? '✓ Selected Plan' : 'Select This Plan'}
      </button>
    </div>
  );
}
