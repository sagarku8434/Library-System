import React, { useState, useEffect } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { QrCode, Scan, CheckCircle2, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';

export default function QRScanner({ onScanSuccess }) {
  const { rotatingQr, markAttendance } = useLibrary();
  const { user } = useAuth();
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [scanStatus, setScanStatus] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const remaining = Math.max(0, Math.ceil((rotatingQr.validUntil - Date.now()) / 1000));
      setSecondsRemaining(remaining);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [rotatingQr]);

  const handleSimulatedScan = (tokenToUse) => {
    setIsScanning(true);
    setScanStatus({ type: 'info', message: 'Scanning reception dynamic barcode...' });

    setTimeout(() => {
      const result = markAttendance(user?.userId, tokenToUse || rotatingQr.token);
      setIsScanning(false);
      if (result.success) {
        setScanStatus({ type: 'success', message: result.message });
        if (onScanSuccess) onScanSuccess(result);
      } else {
        setScanStatus({ type: 'error', message: result.message });
      }
    }, 800);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      {/* Box 1: Reception Desk Live Rotating QR Display */}
      <div className="card" style={{ textAlign: 'center', border: '2px solid #38bdf8', background: '#f0f9ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: '#0369a1', fontWeight: '700', fontSize: '13px' }}>
          <RefreshCw size={15} className="spin-slow" />
          <span>RECEPTION DESK ROTATING QR CODE</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Displayed at Athena Reception. Rotates every 30 seconds to prevent remote token sharing.
        </p>

        {/* QR Simulation Visual */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '16px', 
          display: 'inline-block',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid #bae6fd',
          marginBottom: '16px'
        }}>
          <div style={{ 
            width: '180px', 
            height: '180px', 
            background: '#0f172a', 
            borderRadius: '12px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <QrCode size={130} color="#ffffff" />
            <div style={{ position: 'absolute', bottom: '8px', color: '#38bdf8', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
              ATHENA-SECURE
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' }}>
          <span style={{ color: secondsRemaining < 6 ? '#ef4444' : '#0284c7' }}>
            Next token refresh in: <strong>{secondsRemaining}s</strong>
          </span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
          Token: {rotatingQr.token.substring(0, 18)}...
        </div>
      </div>

      {/* Box 2: Student Camera Scanner Simulation */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Smartphone size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Student QR Scanner</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Point your mobile camera at the live QR token on the front desk to log your check-in or check-out.
          </p>

          {/* Viewfinder simulator */}
          <div style={{ 
            position: 'relative', 
            height: '180px', 
            background: '#0f172a', 
            borderRadius: '14px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: '18px'
          }}>
            {/* Viewfinder corners */}
            <div style={{ width: '120px', height: '120px', border: '2px dashed #38bdf8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scan size={48} color="#38bdf8" style={{ opacity: 0.8 }} />
            </div>
            {/* Animated Laser Beam */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                height: '3px',
                background: '#ef4444',
                boxShadow: '0 0 10px #ef4444',
                animation: 'scannerLaser 1s ease-in-out infinite alternate'
              }} />
            )}
          </div>

          {/* Feedback message */}
          {scanStatus && (
            <div style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              background: scanStatus.type === 'success' ? '#f0fdf4' : scanStatus.type === 'error' ? '#fef2f2' : '#f0f9ff',
              border: `1px solid ${scanStatus.type === 'success' ? '#86efac' : scanStatus.type === 'error' ? '#fca5a5' : '#bae6fd'}`,
              color: scanStatus.type === 'success' ? '#166534' : scanStatus.type === 'error' ? '#991b1b' : '#075985'
            }}>
              {scanStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{scanStatus.message}</span>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => handleSimulatedScan(rotatingQr.token)}
            disabled={isScanning}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '15px' }}
          >
            <Scan size={18} />
            {isScanning ? 'Verifying QR Token...' : 'Scan Reception QR (Check-In / Out)'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scannerLaser {
          0% { top: 20px; }
          100% { top: 160px; }
        }
        .spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
