import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { INITIAL_USERS } from '../../data/athenaData';
import { Users, Search, ShieldCheck, Mail, Phone, FileText } from 'lucide-react';

export default function Students() {
  const { bookings } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');

  // Combine initial users and registered students
  const localUsers = JSON.parse(localStorage.getItem('athena_all_users') || '[]');
  const allStudents = [...INITIAL_USERS, ...localUsers].filter(u => u.role === 'student');

  const filteredStudents = allStudents.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone?.includes(searchTerm)
  );

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Student Registry & ID Verification</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Official student directory, document references, and active passes
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>Identity Document</th>
                <th>Verification</th>
                <th>Active Desk</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const activeBooking = bookings.find(b => b.studentId === student.userId && b.approvalStatus === 'approved');

                return (
                  <tr key={student.userId}>
                    <td>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{student.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {student.userId}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px' }}>{student.phone}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{student.email}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600', fontSize: '13px' }}>
                        {student.profile?.idType || 'Aadhaar Card'}
                      </div>
                      <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {student.profile?.idDocumentRef || 'private/docs/vault_doc.pdf'}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-success">
                        ✓ {student.profile?.verificationStatus || 'Verified'}
                      </span>
                    </td>
                    <td>
                      {activeBooking ? (
                        <span className="badge badge-info" style={{ fontWeight: '700' }}>
                          Desk {activeBooking.seatNumber} ({activeBooking.shiftName.split(' ')[0]})
                        </span>
                      ) : (
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>None active</span>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-neutral">Active</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
