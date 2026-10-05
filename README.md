📚 Athena Library | Smart Seat Booking & Attendance System
<p align="center">
  <img src="public/logo.svg" alt="Athena Library Logo" width="100">
</p>

<p align="center">
  Smart Seat Booking • QR Attendance • Payments • Student & Admin Management
</p>

<p align="center">

     
</p>

📖 About
Athena Library is a full-stack smart library management system designed for study libraries and reading rooms.
Students can view live seat availability, choose a study shift, reserve a desk, make payments, manage memberships, and mark attendance using a dynamic QR system.
The admin portal helps manage students, bookings, seats, attendance, payments, pricing, offline admissions, and revenue.
🔄 System Flow
Register
   ↓
Choose Seat & Shift
   ↓
Make Payment
   ↓
Booking Confirmed
   ↓
QR Attendance
   ↓
Admin Monitoring

✨ Main Features
👨‍🎓 Student Portal
- Live seat availability
- Interactive desk booking
- Multiple study shifts
- Dynamic QR attendance
- Payment receipts
- Booking history
- Membership renewal
- Profile management
🛡️ Admin Portal
- Student management
- Booking approvals
- Offline admissions
- Seat management
- Attendance monitoring
- Payment & revenue tracking
- Pricing management
- Library settings
🖥️ Application Preview
🏠 Homepage
<p align="center">
  <img src="docs/screenshots/home.png" alt="Athena Homepage" width="90%">
</p>

The homepage gives students quick access to seat availability, pricing plans, gallery, contact details, and the booking system.
It serves as the main entry point for both students and administrators and provides direct navigation to the major modules of the platform.
🪑 Interactive Seat Booking
<p align="center">
  <img src="docs/screenshots/seat-selection.png" alt="Seat Booking" width="90%">
</p>

Students can select a booking date, study shift, membership plan, and available desk.
The visual seat map shows available, selected, held, and occupied desks, helping students choose a seat easily while reducing booking conflicts.
👨‍🎓 Student Dashboard
<p align="center">
  <img src="docs/screenshots/student-dashboard.png" alt="Student Dashboard" width="90%">
</p>

The student dashboard displays the assigned desk, active study pass, shift timing, membership validity, attendance status, and recent payment information.
Students can also access bookings, payments, receipts, profile settings, renewal options, and QR attendance from one place.
📱 Dynamic QR Attendance
<p align="center">
  <img src="docs/screenshots/qr-attendance.png" alt="QR Attendance" width="90%">
</p>

Students can scan a rotating QR code at the library reception to record their check-in and check-out.
The system stores attendance timestamps, assigned desk, shift details, and current attendance status for better monitoring.
🛠️ Tech Stack
Technology	Purpose
React.js	Frontend
Vite	Development
Node.js	Backend
Express.js	REST API
MongoDB	Database
JWT	Authentication
Razorpay	Payments


📁 Project Structure
Library-System/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── context/
│   └── services/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   └── server.js
├── docs/
│   └── screenshots/
├── public/
└── README.md

⚙️ Run Locally
Clone the repository:
git clone https://github.com/sagarku8434/Library-System.git
cd Library-System

Install frontend dependencies:
npm install
npm run dev

Run backend:
cd backend
npm install
npm run dev

Frontend:
http://localhost:5173

Backend:
http://localhost:5000/api

👨‍💻 Developed By
Sagar Kumar
GitHub: @sagarku8434