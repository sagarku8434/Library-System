import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { ShieldCheck, BookOpen, AlertTriangle, FileText, Lock } from 'lucide-react';

export default function RulesPolicy() {
  const { settings } = useLibrary();

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ marginBottom: '40px' }}>
          <span className="badge badge-info" style={{ marginBottom: '8px' }}>Official Policies</span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>
            Library Rules, Privacy & Refund Terms
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Guidelines governing disciplined study conduct, secure data management, and transactions at Athena Library.
          </p>
        </div>

        {/* Section 1: Code of Conduct */}
        <div className="card" style={{ marginBottom: '30px' }} id="rules">
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
            <BookOpen size={20} style={{ color: 'var(--primary)' }} />
            1. Reading Room Code of Conduct
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#334155' }}>
            {settings.rules?.map((rule, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontWeight: '800', color: 'var(--primary)', minWidth: '20px' }}>{idx + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Cancellation & Refund Policy */}
        <div className="card" style={{ marginBottom: '30px' }} id="cancellation">
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
            <ShieldCheck size={20} style={{ color: '#16a34a' }} />
            2. Cancellation & Refund Policy
          </h3>
          <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.7', marginBottom: '14px' }}>
            {settings.refundPolicy}
          </p>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
            <strong>Refund Processing Timeline:</strong> Refunds approved by administration are credited directly to the original payment source (UPI/Card/Bank Account) via Razorpay payment gateway within 5–7 banking business days.
          </div>
        </div>

        {/* Section 3: Privacy & DPDP Compliance */}
        <div className="card" style={{ marginBottom: '30px' }} id="privacy">
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
            <Lock size={20} style={{ color: '#7c3aed' }} />
            3. Privacy Notice & Personal Data Protection (DPDP Framework)
          </h3>
          <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.7', marginBottom: '12px' }}>
            Athena Library complies with India's Digital Personal Data Protection principles. We collect minimal student personal details (Name, Phone number, Email, Identity Document) strictly for student verification, fire safety compliance, and seat allocation.
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569', marginBottom: '14px' }}>
            <li>Identity documents (Aadhaar/College ID) are encrypted and stored in private vaults accessible exclusively to verified library management.</li>
            <li>We do not store student debit/credit card credentials. All payments are securely tokenized and handled by Razorpay.</li>
            <li>Student attendance logs are maintained for safety verification and will not be shared with third parties without consent.</li>
          </ul>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            For privacy grievances or document deletion requests upon membership conclusion, email us at: <strong>{settings.ownerEmail}</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
