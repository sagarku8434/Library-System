import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import CheckInCard from '../../components/attendance/CheckInCard';
import QRScanner from '../../components/attendance/QRScanner';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import { QrCode, ShieldCheck, Info } from 'lucide-react';

export default function MyAttendance() {
  const { user } = useAuth();
  const { attendance, bookings } = useLibrary();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.studentId === user?.userId && a.date === todayStr);

  const studentBookings = bookings.filter(b => b.studentId === user?.userId);
  const activeBooking = studentBookings.find(b => b.approvalStatus === 'approved' && b.attendanceEnabled);

  const studentAttendanceLogs = attendance.filter(a => a.studentId === user?.userId);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Dynamic QR Attendance</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Self check-in and check-out via dynamic rotating reception QR code
        </p>
      </div>

      {/* Today's Status Header Card */}
      <div style={{ marginBottom: '28px' }}>
        <CheckInCard todayAttendance={todayAttendance} activeBooking={activeBooking} />
      </div>

      {/* QR Scanner & Reception Display Section */}
      <div style={{ marginBottom: '32px' }}>
        <QRScanner />
      </div>

      {/* Historical Logs */}
      <div>
        <AttendanceCalendar logs={studentAttendanceLogs} />
      </div>
    </div>
  );
}
