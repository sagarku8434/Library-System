import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, ShieldCheck, FileText, CheckCircle2, Save, Lock } from 'lucide-react';

export default function MyProfile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.profile?.address || '',
    idType: user?.profile?.idType || 'Aadhaar Card',
    idNumber: user?.profile?.idNumber || ''
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      profile: {
        address: formData.address,
        idType: formData.idType,
        idNumber: formData.idNumber
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Student Profile & ID Credentials</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Manage your contact information and review verified verification documents
        </p>
      </div>

      {saved && (
        <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', color: '#166534', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <CheckCircle2 size={18} />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                required
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Registered Email</label>
            <input
              type="email"
              disabled
              className="form-input"
              value={formData.email}
              style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Email is bound to your account and cannot be modified.</span>
          </div>

          <div className="form-group">
            <label className="form-label">Residential Address</label>
            <input
              type="text"
              className="form-input"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          {/* Secure Document Vault Status */}
          <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} style={{ color: '#2563eb' }} />
                <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Identity Verification Vault</h4>
              </div>
              <span className="badge badge-success">✓ {user?.profile?.verificationStatus || 'Verified'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>ID Type:</span>
                <div style={{ fontWeight: '600' }}>{user?.profile?.idType || 'Aadhaar Card'}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>ID Reference:</span>
                <div style={{ fontWeight: '600', fontFamily: 'var(--font-mono)' }}>{user?.profile?.idNumber || 'XXXX-4819'}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--text-muted)' }}>Encrypted Document URI:</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--primary)' }}>
                  {user?.profile?.idDocumentRef || 'private/docs/vault_encrypted_id.pdf'}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
            <Save size={16} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
