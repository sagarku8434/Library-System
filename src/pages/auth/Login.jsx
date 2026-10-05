import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function Login() {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/student/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const result = login(email, password);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from === '/login' ? '/student/dashboard' : from);
      }
    } else {
      setError(result.message);
    }
  };

  const handleQuickDemoLogin = (role) => {
    switchDemoRole(role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img src="/logo.svg" alt="Athena Logo" style={{ width: '48px', height: '48px', borderRadius: '12px', margin: '0 auto 12px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Welcome Back</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Sign in to manage your seat, attendance, and receipts
            </p>
          </div>

          {error && (
            <div style={{ padding: '12px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', fontSize: '13px', marginBottom: '18px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="e.g. rahul@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '6px' }}>
              Sign In to Athena <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick 1-Click Demo Login Bar */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', textAlign: 'center', marginBottom: '12px' }}>
              One-Click Instant Demo Login
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="btn btn-secondary" 
                style={{ fontSize: '12px', padding: '8px' }}
              >
                <UserCheck size={14} style={{ color: 'var(--primary)' }} />
                Student (Rahul)
              </button>
              <button 
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="btn btn-secondary" 
                style={{ fontSize: '12px', padding: '8px' }}
              >
                <ShieldCheck size={14} style={{ color: '#7c3aed' }} />
                Admin (Owner)
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            New student?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700' }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
