import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { 
  Armchair, 
  Wifi, 
  BatteryCharging, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  QrCode,
  Users
} from 'lucide-react';

export default function Home() {
  const { settings, seats, revenueStats } = useLibrary();

  const availableDesks = seats.length - revenueStats.activeSeatsCount;

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', 
        color: 'white', 
        padding: '70px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255, 255, 255, 0.12)', 
              backdropFilter: 'blur(10px)',
              padding: '6px 14px', 
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Sparkles size={14} color="#38bdf8" />
              <span>Smart Study Pods & Reserved Desk System</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-1px' }}>
              Study Without Distractions. <br />
              <span style={{ color: '#38bdf8' }}>Reserve Your Dedicated Desk Online.</span>
            </h1>

            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '32px', maxWidth: '640px' }}>
              Welcome to <strong>{settings.libraryName}</strong>. Architectural cubicles, 24/7 power backup, silent AC zones, high-speed fiber Wi-Fi, and dynamic QR self-attendance.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}>
              <Link to="/seats" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px', background: '#38bdf8', color: '#0f172a', fontWeight: '800' }}>
                <Armchair size={20} /> View Live Seat Map & Book
              </Link>
              <Link to="/pricing" className="btn btn-outline" style={{ padding: '14px 24px', fontSize: '16px', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                View Shift Plans <ArrowRight size={18} />
              </Link>
            </div>

            {/* Quick Live Capacity Pill */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '16px', 
              padding: '12px 20px', 
              background: 'rgba(15, 23, 42, 0.7)', 
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '13px'
            }}>
              <div>
                <span style={{ color: '#22c55e', fontWeight: '800', fontSize: '16px' }}>{availableDesks}</span>
                <span style={{ color: '#94a3b8' }}> / {seats.length} Desks Available Today</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8' }}>
                <Clock size={16} /> 24/7 Biometric & QR Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Amenities */}
      <section style={{ padding: '70px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
            <span className="badge badge-info" style={{ marginBottom: '8px' }}>Engineered for Deep Work</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>World-Class Study Facilities</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Everything you need for laser-focused UPSC, NEET, JEE, GATE, and CA preparation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Armchair size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Dedicated Reserved Desks</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Pick your exact desk on the interactive map. Your seat remains guaranteed for your booked shift without competition.
              </p>
            </div>

            <div className="card" style={{ border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Wifi size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>High-Speed Dual Fiber Wi-Fi</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                300+ Mbps redundant optical fiber broadband ensuring video lectures and online mock exams never buffer.
              </p>
            </div>

            <div className="card" style={{ border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fefce8', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <BatteryCharging size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>100% 24/7 Power Backup</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Heavy-duty silent online UPS and automatic generator backup guarantee zero interruption during power outages.
              </p>
            </div>

            <div className="card" style={{ border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <QrCode size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Dynamic QR Attendance</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Effortless check-in and check-out via dynamic rotating reception QR code. Track your daily hours in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Message & Trust Banner */}
      <section style={{ padding: '60px 0', background: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            border: '1px solid var(--border)', 
            padding: '36px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-success" style={{ marginBottom: '10px' }}>Owner's Commitment</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                "We built Athena so you don't lose a single minute of study."
              </h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.7', marginBottom: '16px' }}>
                "Every desk at Athena is equipped with individual LED lamps, noise-dampening acoustic dividers, and cushioned lumbar support. Whether you prepare for civil services or medical entrance, we give you an atmosphere of pure discipline and comfort."
              </p>
              <div>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '15px' }}>{settings.ownerName}</strong>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Founder & Operations Director · Athena Library Patna</span>
              </div>
            </div>

            <div style={{ background: '#f1f5f9', borderRadius: '14px', padding: '24px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} /> Library Location & Details
              </h4>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', marginBottom: '16px' }}>
                {settings.address}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div><strong>Direct Inquiries:</strong> {settings.ownerPhone}</div>
                <div><strong>Email:</strong> {settings.ownerEmail}</div>
                <div><strong>Operating Hours:</strong> {settings.operatingHours}</div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <Link to="/contact" className="btn btn-outline" style={{ width: '100%', fontSize: '13px' }}>
                  Get Directions & Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Book CTA */}
      <section style={{ padding: '60px 0', textAlign: 'center', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            Start Your Focused Study Journey Today
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Seats fill up quickly for peak shifts. Select your preferred seat and register online in under 2 minutes.
          </p>
          <Link to="/seats" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
            Book Your Seat Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
