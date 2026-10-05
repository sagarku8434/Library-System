import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { settings } = useLibrary();

  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', paddingTop: '60px', paddingBottom: '30px', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '40px',
          marginBottom: '50px' 
        }}>
          {/* Col 1: Brand & Tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logo.svg" alt="Athena Logo" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>
                ATHENA <span style={{ color: '#38bdf8' }}>LIBRARY</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              {settings.tagline || 'Modern study pods with sound-dampened architectural ergonomics, 24/7 power backup, and dynamic QR attendance automation.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#38bdf8' }}>
              <Clock size={16} />
              <span>{settings.operatingHours}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '18px' }}>Portals & Pages</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><Link to="/seats" style={{ hoverColor: 'white' }}>Live Seat Map & Availability</Link></li>
              <li><Link to="/pricing">Pricing & Shift Plans</Link></li>
              <li><Link to="/student/dashboard">Student Portal & Bookings</Link></li>
              <li><Link to="/student/attendance">Self-Attendance Check-In</Link></li>
              <li><Link to="/admin/dashboard">Admin Management Portal</Link></li>
              <li><Link to="/rules">Library Code of Conduct & Rules</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '18px' }}>Location & Inquiries</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                <span>{settings.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span>{settings.ownerPhone}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span>{settings.ownerEmail}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                <ShieldCheck size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Direct Owner Desk: {settings.ownerName}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '18px' }}>Legal & Security</h4>
            <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
              Equipped with Razorpay bank-grade merchant encryption, dynamic rotating QR tokens, and private ID credential vaults compliant with Indian DPDP frameworks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <Link to="/rules#cancellation" style={{ color: '#cbd5e1', textDecoration: 'underline' }}>Cancellation & Refund Policy</Link>
              <Link to="/rules#privacy" style={{ color: '#cbd5e1', textDecoration: 'underline' }}>Privacy & Document Retention</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #1e293b', 
          paddingTop: '24px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '16px',
          fontSize: '13px' 
        }}>
          <div>
            © {new Date().getFullYear()} Athena Library. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Patna's Premier Automated Study Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
