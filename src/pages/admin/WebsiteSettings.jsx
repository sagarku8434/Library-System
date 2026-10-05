import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Globe, Save, CheckCircle2 } from 'lucide-react';

export default function WebsiteSettings() {
  const { settings, updateSettings } = useLibrary();

  const [formData, setFormData] = useState({
    libraryName: settings.libraryName || '',
    tagline: settings.tagline || '',
    ownerName: settings.ownerName || '',
    ownerPhone: settings.ownerPhone || '',
    ownerEmail: settings.ownerEmail || '',
    address: settings.address || '',
    operatingHours: settings.operatingHours || ''
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '780px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Website Content & Public CMS</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Update public website headers, banners, location address, and contact details without changing source code
        </p>
      </div>

      {saved && (
        <div style={{ padding: '14px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>Website content updated across the portal!</span>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Official Library Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.libraryName}
              onChange={(e) => setFormData({ ...formData, libraryName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Promotional Tagline</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Owner / Managing Director Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Public Contact Phone</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Public Inquiries Email</label>
              <input
                type="email"
                required
                className="form-input"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Operating Hours</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Physical Campus Address</label>
            <textarea
              rows={3}
              required
              className="form-textarea"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            <Save size={16} /> Publish Website Changes
          </button>
        </form>
      </div>
    </div>
  );
}
