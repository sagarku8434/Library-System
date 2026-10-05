import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  QrCode, 
  LayoutDashboard, 
  CreditCard, 
  Armchair, 
  FileText,
  CalendarCheck
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, switchDemoRole, isAdmin, isStudent } = useAuth();
  const { revenueStats } = useLibrary();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{ 
      background: 'white', 
      borderBottom: '1px solid var(--border)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Quick Demo Role Switcher Bar */}
      <div style={{ 
        background: '#0f172a', 
        color: '#94a3b8', 
        fontSize: '12px', 
        padding: '6px 20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
          <span style={{ color: '#e2e8f0', fontWeight: '500' }}>Athena Live Node:</span> 24/7 Smart Desk Automation Active
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Switch Mode:</span>
          <button 
            onClick={() => switchDemoRole('student')}
            style={{ 
              background: isStudent ? '#2563eb' : '#1e293b', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '4px', 
              fontSize: '11px',
              fontWeight: '600'
            }}
          >
            Student (Rahul)
          </button>
          <button 
            onClick={() => switchDemoRole('admin')}
            style={{ 
              background: isAdmin ? '#7c3aed' : '#1e293b', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '4px', 
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={12} />
            Admin (Owner)
            {revenueStats.pendingRequestsCount > 0 && (
              <span style={{ background: '#ef4444', color: 'white', borderRadius: '50%', padding: '0 4px', fontSize: '10px' }}>
                {revenueStats.pendingRequestsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.svg" alt="Athena Logo" style={{ width: '38px', height: '38px', borderRadius: '8px' }} />
          <div>
            <div style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.5px', color: '#0f172a', lineHeight: '1.1' }}>
              ATHENA <span style={{ color: 'var(--primary)', fontWeight: '700' }}>LIBRARY</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Smart Study Pods
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav style={{ display: 'none', mdDisplay: 'flex', alignItems: 'center', gap: '22px' }} className="desktop-nav">
          <Link to="/" style={{ fontWeight: 600, fontSize: '14px', color: isActive('/') ? 'var(--primary)' : 'var(--secondary-muted)' }}>
            Home
          </Link>
          <Link to="/seats" style={{ fontWeight: 600, fontSize: '14px', color: isActive('/seats') ? 'var(--primary)' : 'var(--secondary-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Armchair size={16} /> Seats & Live Map
          </Link>
          <Link to="/pricing" style={{ fontWeight: 600, fontSize: '14px', color: isActive('/pricing') ? 'var(--primary)' : 'var(--secondary-muted)' }}>
            Pricing Plans
          </Link>
          <Link to="/gallery" style={{ fontWeight: 600, fontSize: '14px', color: isActive('/gallery') ? 'var(--primary)' : 'var(--secondary-muted)' }}>
            Gallery
          </Link>
          <Link to="/contact" style={{ fontWeight: 600, fontSize: '14px', color: isActive('/contact') ? 'var(--primary)' : 'var(--secondary-muted)' }}>
            Contact
          </Link>

          {/* Student Portal Dropdown / Shortcut */}
          {user && isStudent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingLeft: '12px', borderLeft: '1px solid var(--border)' }}>
              <Link to="/student/dashboard" className="btn btn-outline" style={{ padding: '7px 12px', fontSize: '13px' }}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link to="/student/attendance" className="btn btn-primary" style={{ padding: '7px 12px', fontSize: '13px' }}>
                <QrCode size={15} /> QR Attendance
              </Link>
            </div>
          )}

          {/* Admin Portal Shortcut */}
          {user && isAdmin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '12px', borderLeft: '1px solid var(--border)' }}>
              <Link to="/admin/dashboard" style={{ background: '#7c3aed', color: 'white', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Admin Portal
              </Link>
            </div>
          )}

          {/* User Status / Login Buttons */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to={isAdmin ? "/admin/settings" : "/student/profile"} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#1e293b', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <User size={15} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={() => { logout(); navigate('/login'); }} title="Sign Out" style={{ color: '#ef4444', padding: '6px' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 14px' }}>Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>Student Sign Up</Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'block', padding: '8px' }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/seats" onClick={() => setMobileMenuOpen(false)}>Seat Availability</Link>
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing Plans</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery & Amenities</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            {user && (
              <>
                <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />
                {isStudent && (
                  <>
                    <Link to="/student/dashboard" onClick={() => setMobileMenuOpen(false)}>Student Dashboard</Link>
                    <Link to="/student/bookings" onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
                    <Link to="/student/attendance" onClick={() => setMobileMenuOpen(false)}>My Attendance (QR)</Link>
                    <Link to="/student/payments" onClick={() => setMobileMenuOpen(false)}>My Payments & Receipts</Link>
                    <Link to="/student/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                  </>
                )}
                {isAdmin && (
                  <>
                    <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                    <Link to="/admin/students" onClick={() => setMobileMenuOpen(false)}>Students Management</Link>
                    <Link to="/admin/requests" onClick={() => setMobileMenuOpen(false)}>Booking Requests ({revenueStats.pendingRequestsCount})</Link>
                    <Link to="/admin/seats" onClick={() => setMobileMenuOpen(false)}>Seat & Shift Management</Link>
                    <Link to="/admin/revenue" onClick={() => setMobileMenuOpen(false)}>Revenue Analytics</Link>
                  </>
                )}
                <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/login'); }} style={{ color: '#ef4444', textAlign: 'left', fontWeight: '600' }}>
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link to="/login" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                <Link to="/register" className="btn btn-primary" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 868px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
