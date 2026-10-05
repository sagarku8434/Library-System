# Athena Library | Smart Seat Booking & Attendance System

Athena Library is a full-stack, enterprise-grade digital management platform engineered for commercial study libraries and reading rooms. It unifies online desk reservations, live conflict-safe seat allocation, Razorpay payment processing, dynamic QR attendance, student ID verification, and administrative operations.

---

## Key Features

### Student Portal
- **Interactive Seat Map**: Live architectural layout of desks across reading halls with dynamic status indicators.
- **Conflict-Safe Booking Engine**: Prevents double-booking across overlapping morning, afternoon, evening, and full-day shifts.
- **Dynamic QR Attendance**: Self check-in and check-out via dynamic rotating 30-second tokens at library reception.
- **Instant Receipts**: Verified Razorpay payment receipts with printable and downloadable slips.
- **Seamless Renewals**: Retain the same assigned desk for subsequent months with 1-click renewal.
- **DPDP Compliant**: Encrypted storage references for Aadhaar and College ID credentials.

### Admin & Owner Command Portal
- **Real-Time Operations Dashboard**: Live metrics for revenue, occupancy rates, today's attendance, and active bookings.
- **Booking Approvals & Refunds**: Verify online student admissions; 1-click approvals and automated refund workflows.
- **Offline Admissions**: Handle walk-in students, collect cash/counter UPI, and reserve desks on the same live engine.
- **Desk & Capacity Management**: Add, relocate, or disable desks for maintenance across halls.
- **Live Attendance Audits**: Monitor students inside the reading rooms with administrative timestamp overrides.
- **Revenue Analytics**: Shift-wise breakdown, reconciliation reports, and CSV data export.
- **Website CMS**: Update branding, contact numbers, address, and operating hours without touching source code.

---

## Project Structure

```
Library-System/
├── src/
│   ├── components/
│   │   ├── common/         # Navbar, Footer, ProtectedRoute, Loader, Modal
│   │   ├── booking/        # SeatMap, SeatCard, ShiftSelector, PricingCard, BookingSummary
│   │   └── attendance/     # QRScanner, CheckInCard, AttendanceCalendar
│   ├── pages/
│   │   ├── public/         # Home, Seats, Pricing, Gallery, Contact, RulesPolicy
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   ├── student/        # StudentDashboard, MyBookings, Checkout, PaymentResult, MyPayments, MyAttendance, RenewBooking, MyProfile
│   │   └── admin/          # AdminDashboard, Students, BookingRequests, AllBookings, SeatManagement, PricingManagement, Attendance, Payments, Revenue, OfflineAdmissions, WebsiteSettings, Settings
│   ├── layouts/            # PublicLayout, StudentLayout, AdminLayout
│   ├── services/           # api, authService, bookingService, paymentService, attendanceService
│   ├── context/            # AuthContext, LibraryContext
│   ├── data/               # athenaData (Initial rooms, 54 desks, shifts, plans, seed records)
│   ├── App.jsx             # React Router structure
│   └── index.css           # Architectural UI design system
│
├── backend/
│   ├── src/
│   │   ├── config/         # db, paymentGateway, storage
│   │   ├── models/         # User, StudentProfile, Room, Seat, PricingPlan, Booking, SeatAllocation, Payment, Attendance, LibrarySettings, Notification, AuditLog
│   │   ├── routes/         # authRoutes, studentRoutes, seatRoutes, bookingRoutes, paymentRoutes, attendanceRoutes, adminRoutes
│   │   ├── services/       # bookingEngine, availabilityService, qrService
│   │   ├── middleware/     # authMiddleware, roleMiddleware
│   │   └── utils/          # seedData script
│   ├── server.js           # Express application entry
│   ├── package.json
│   └── .env.example
│
├── docs/
│   ├── API.md              # REST API Reference
│   ├── DATABASE.md         # Schemas & Conflict-Safe Algorithm
│   ├── DEPLOYMENT.md       # Production Deployment Guide
│   └── USER-MANUAL.md      # Operating Manual
│
└── package.json
```

---

## Quick Start

### 1. Frontend Development Server

```bash
# In the root project directory:
npm install
npm run dev
```
The React frontend starts at `http://localhost:5173`.

#### Instant Demo Switcher:
Use the top role switcher in the navigation bar to toggle between:
- **Student (Rahul)**: View student dashboard, book seats, test dynamic QR scanner, download receipts.
- **Admin (Owner)**: View executive dashboard, approve booking requests, register walk-ins, edit prices.

---

### 2. Backend Server

```bash
cd backend
npm install
cp .env.example .env
# Optional: Seed initial database
npm run seed
# Start server
npm run dev
```
The backend server runs on `http://localhost:5000/api`.
