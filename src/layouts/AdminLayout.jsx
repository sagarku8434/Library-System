import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import {
  LayoutDashboard,
  Users,
  Inbox,
  CalendarDays,
  Armchair,
  Clock,
  QrCode,
  CreditCard,
  TrendingUp,
  UserPlus,
  Globe,
  Settings
} from 'lucide-react';

export default function AdminLayout() {
  const { user } = useAuth();
  const { revenueStats } = useLibrary();

  const adminNav = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
    { to: '/admin/students', label: 'Students', icon: <Users size={15} /> },
    { 
      to: '/admin/requests', 
      label: 'Requests', 
      icon: <Inbox size={15} />,
      badge: revenueStats.pendingRequestsCount > 0 ? revenueStats.pendingRequestsCount : null
    },
    { to: '/admin/bookings', label: 'All Bookings', icon: <CalendarDays size={15} /> },
    { to: '/admin/seats', label: 'Seat Management', icon: <Armchair size={15} /> },
    { to: '/admin/pricing', label: 'Pricing & Shifts', icon: <Clock size={15} /> },
    { to: '/admin/attendance', label: 'Live Attendance', icon: <QrCode size={15} /> },
    { to: '/admin/payments', label: 'Payments', icon: <CreditCard size={15} /> },
    { to: '/admin/revenue', label: 'Revenue Analytics', icon: <TrendingUp size={15} /> },
    { to: '/admin/admissions', label: 'Offline Walk-ins', icon: <UserPlus size={15} /> },
    { to: '/admin/website', label: 'Content CMS', icon: <Globe size={15} /> },
    { to: '/admin/settings', label: 'Settings & Rules', icon: <Settings size={15} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      {/* Admin Command Bar */}
      <div style={{ background: '#0f172a', color: 'white', borderBottom: '1px solid #1e293b', paddingTop: '20px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div>
              <span className="badge" style={{ background: '#7c3aed', color: 'white', marginBottom: '6px' }}>
                Athena Admin Command Center
              </span>
              <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                Business Management & Operations
              </h1>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Logged in as: {user?.name} · Commercial Branch: Patna Node
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/admin/admissions" className="btn btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
                <UserPlus size={15} /> Walk-in Admission
              </Link>
            </div>
          </div>

          {/* Admin Navigation Pills */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: '6px', paddingBottom: '4px' }}>
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin/dashboard'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  background: isActive ? '#334155' : 'transparent',
                  borderBottom: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                  borderRadius: '6px 6px 0 0',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                })}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{ 
                    background: '#ef4444', 
                    color: 'white', 
                    borderRadius: '999px', 
                    padding: '0 6px', 
                    fontSize: '10px',
                    fontWeight: '800'
                  }}>
                    {item.badge}
                  </span>
                )}
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
