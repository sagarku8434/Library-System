import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  QrCode, 
  Receipt, 
  User, 
  RefreshCw,
  Armchair
} from 'lucide-react';

export default function StudentLayout() {
  const { user } = useAuth();

  const navLinks = [
    { to: '/student/dashboard', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { to: '/student/bookings', label: 'My Bookings', icon: <CalendarCheck size={16} /> },
    { to: '/student/attendance', label: 'Self Attendance', icon: <QrCode size={16} /> },
    { to: '/student/payments', label: 'Payments & Receipts', icon: <Receipt size={16} /> },
    { to: '/student/profile', label: 'Profile & Documents', icon: <User size={16} /> },
    { to: '/student/renew', label: 'Renew / Upgrade', icon: <RefreshCw size={16} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      
      {/* Student Sub-Header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid var(--border)', paddingTop: '20px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div>
              <span className="badge badge-info" style={{ marginBottom: '6px' }}>Student Study Portal</span>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                Welcome, {user?.name || 'Student'}
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Patna Study Node · Member ID: {user?.userId || 'STU-001'}
              </p>
            </div>
            <div>
              <Link to="/seats" className="btn btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
                <Armchair size={15} /> Book Another Desk
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '2px' }}>
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/student/dashboard'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                })}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <main style={{ flex: 1, padding: '30px 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
