import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Common
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Seats from './pages/public/Seats';
import Pricing from './pages/public/Pricing';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';
import RulesPolicy from './pages/public/RulesPolicy';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Student Pages
import Checkout from './pages/student/Checkout';
import PaymentResult from './pages/student/PaymentResult';
import StudentDashboard from './pages/student/StudentDashboard';
import MyBookings from './pages/student/MyBookings';
import MyAttendance from './pages/student/MyAttendance';
import MyPayments from './pages/student/MyPayments';
import MyProfile from './pages/student/MyProfile';
import RenewBooking from './pages/student/RenewBooking';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Students from './pages/admin/Students';
import BookingRequests from './pages/admin/BookingRequests';
import AllBookings from './pages/admin/AllBookings';
import SeatManagement from './pages/admin/SeatManagement';
import PricingManagement from './pages/admin/PricingManagement';
import Attendance from './pages/admin/Attendance';
import Payments from './pages/admin/Payments';
import Revenue from './pages/admin/Revenue';
import OfflineAdmissions from './pages/admin/OfflineAdmissions';
import WebsiteSettings from './pages/admin/WebsiteSettings';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/seats" element={<Seats />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rules" element={<RulesPolicy />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-status" element={<PaymentResult />} />
            </Route>

            {/* Student Protected Layout */}
            <Route 
              path="/student" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="bookings" element={<MyBookings />} />
              <Route path="attendance" element={<MyAttendance />} />
              <Route path="payments" element={<MyPayments />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="renew" element={<RenewBooking />} />
            </Route>

            {/* Admin Protected Layout */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="requests" element={<BookingRequests />} />
              <Route path="bookings" element={<AllBookings />} />
              <Route path="seats" element={<SeatManagement />} />
              <Route path="pricing" element={<PricingManagement />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="payments" element={<Payments />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="admissions" element={<OfflineAdmissions />} />
              <Route path="website" element={<WebsiteSettings />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </AuthProvider>
  );
}