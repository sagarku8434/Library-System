import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { settings } = useLibrary();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
          <span className="badge badge-info" style={{ marginBottom: '8px' }}>Get in Touch</span>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            Visit Athena Library
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Book an in-person physical tour of the study halls or contact the administration directly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {/* Contact Details */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>Contact Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Physical Campus Address</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {settings.address}
                  </p>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Direct Phone / WhatsApp</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {settings.ownerPhone}
                  </p>
                  <span style={{ fontSize: '12px', color: '#16a34a' }}>● Available 24/7 on WhatsApp</span>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fefce8', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Official Inquiries & Email</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {settings.ownerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="card">
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Send an Inquiry</h3>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#166534', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac' }}>
                <CheckCircle2 size={40} style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: '800' }}>Inquiry Received!</h4>
                <p style={{ fontSize: '14px', marginTop: '6px' }}>
                  Our front desk manager ({settings.ownerName}) will reach out to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyanshu Sharma"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. priyanshu@gmail.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Shift Preference</label>
                  <textarea
                    rows={4}
                    required
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us which exam you're preparing for or which shift you prefer..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  <Send size={16} /> Send Direct Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
