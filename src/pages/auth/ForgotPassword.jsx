import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Reset Password</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Enter your registered student email to receive an OTP reset link
            </p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', color: '#166534' }}>
              <CheckCircle2 size={36} style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontWeight: '800' }}>Reset Instructions Sent!</h4>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                We have dispatched a verification code to <strong>{email}</strong>.
              </p>
              <Link to="/login" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex', fontSize: '13px' }}>
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Registered Email</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="e.g. rahul@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Send Password Reset Link
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/login" style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
