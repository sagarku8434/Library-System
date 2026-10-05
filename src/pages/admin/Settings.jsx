import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Settings as SettingsIcon, ShieldCheck, Key, Users, Save, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useLibrary();

  const [rulesText, setRulesText] = useState((settings.rules || []).join('\n'));
  const [refundPolicy, setRefundPolicy] = useState(settings.refundPolicy || '');
  const [merchantId, setMerchantId] = useState(settings.razorpayMerchantId || 'rzp_test_athena_official');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({
      rules: rulesText.split('\n').filter(r => r.trim().length > 0),
      refundPolicy,
      razorpayMerchantId: merchantId
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Library Rules & Security Settings</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Configure discipline code of conduct, gateway API credentials, and administrative roles
        </p>
      </div>

      {saved && (
        <div style={{ padding: '14px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>Policies and security configurations saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Rules of Conduct */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '14px' }}>
            Code of Conduct & Discipline Rules (1 per line)
          </h3>
          <textarea
            rows={6}
            className="form-textarea"
            value={rulesText}
            onChange={(e) => setRulesText(e.target.value)}
          />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
            Displayed on the public rules page and acknowledged by students during registration.
          </span>
        </div>

        {/* Cancellation Policy */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '14px' }}>
            Cancellation & Refund Terms
          </h3>
          <textarea
            rows={4}
            className="form-textarea"
            value={refundPolicy}
            onChange={(e) => setRefundPolicy(e.target.value)}
          />
        </div>

        {/* Razorpay Gateway Keys */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} style={{ color: 'var(--primary)' }} />
            Payment Gateway Merchant Configuration
          </h3>
          <div className="form-group">
            <label className="form-label">Client-Owned Razorpay Merchant Key ID</label>
            <input
              type="text"
              className="form-input"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
              Ensure payments settle directly into the client's verified commercial bank account.
            </span>
          </div>
        </div>

        {/* Staff & RBAC Permissions */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} style={{ color: '#7c3aed' }} />
            Administrative Accounts & Staff Roles
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Currently 1 Super Admin (Library Owner) configured. Additional employee accounts with limited attendance-only permissions can be provisioned.
          </p>
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Vikramaditya Sharma</strong> · <code>admin@athena.com</code>
            </div>
            <span className="badge badge-success">Super Admin (Owner)</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
          <Save size={16} /> Save Settings & Policies
        </button>
      </form>
    </div>
  );
}
