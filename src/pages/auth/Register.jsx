import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Upload, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    idType: 'Aadhaar Card',
    idNumber: '',
    idFileName: ''
  });
  const [fileSelected, setFileSelected] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, idFileName: e.target.files[0].name });
      setFileSelected(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(formData);
    if (result.success) {
      navigate('/student/dashboard');
    }
  };

  return (
    <div style={{ padding: '50px 0', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '580px' }}>
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge badge-info" style={{ marginBottom: '8px' }}>New Student Admission</span>
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>Register as an Athena Scholar</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Complete identity details to enable seat reservation and dynamic QR attendance
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Rahul Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  placeholder="e.g. 98765 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="e.g. rahul@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Create Password *</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential Address</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Boring Road, Patna, Bihar - 800001"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Document Verification Section */}
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={16} style={{ color: 'var(--primary)' }} /> Secure Student ID Verification
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label">Document Type *</label>
                  <select 
                    className="form-select"
                    value={formData.idType}
                    onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="College ID">College ID Card</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Document / ID Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. XXXX-XXXX-4819"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  />
                </div>
              </div>

              {/* Upload Box */}
              <div>
                <label className="form-label">Upload Identity Document (Encrypted Vault) *</label>
                <label style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '16px', 
                  border: '2px dashed var(--border)', 
                  borderRadius: '10px', 
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                  />
                  {fileSelected ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: '600', fontSize: '13px' }}>
                      <CheckCircle2 size={18} />
                      <span>{formData.idFileName} (Uploaded)</span>
                    </div>
                  ) : (
                    <div>
                      <Upload size={20} style={{ color: 'var(--primary)', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>Click to upload file (PDF, JPG, PNG)</div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Files are stored in private S3/Storage and never made public</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* DPDP Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="consent"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginTop: '4px' }}
                required
              />
              <label htmlFor="consent" style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                I consent to verification of my ID document under Athena's <Link to="/rules#privacy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>DPDP-compliant privacy policy</Link> and agree to follow library discipline rules.
              </label>
            </div>

            <button type="submit" disabled={!agreed} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
              Complete Registration & Access Portal <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>
              Sign in to account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
