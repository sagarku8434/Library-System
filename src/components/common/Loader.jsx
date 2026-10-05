import React from 'react';

export default function Loader({ message = 'Loading Athena Library systems...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '4px solid #e2e8f0',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
