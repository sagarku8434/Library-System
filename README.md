Students can view available desks, select a study shift, reserve a seat, manage payments, renew memberships, and record attendance using a dynamic QR system.

The admin portal provides tools for managing students, bookings, seats, attendance, pricing, payments, offline admissions, and revenue.

---

## 🔄 System Flow

```text
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
- Interactive seat booking
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

The homepage gives students quick access to seat availability, plans, gallery, contact information, and the booking system.
It serves as the main entry point for students and administrators.
🪑 Seat Booking
<p align="center">
  <img src="docs/screenshots/seat-selection.png" alt="Seat Booking" width="90%">
</p>

Students select a date, study shift, membership plan, and available desk.
The visual seat map distinguishes available, selected, held, and occupied desks and helps avoid booking conflicts.
👨‍🎓 Student Dashboard
<p align="center">
  <img src="docs/screenshots/student-dashboard.png" alt="Student Dashboard" width="90%">
</p>

The dashboard displays the student's assigned desk, active plan, attendance status, bookings, payments, and membership validity.
Students can also access renewal, profile, and QR attendance options.
📱 QR Attendance
<p align="center">
  <img src="docs/screenshots/qr-attendance.png" alt="QR Attendance" width="90%">
</p>

Students scan a rotating QR code at the library to record check-in and check-out.
The system stores attendance timestamps, assigned desk, shift details, and current attendance status.
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
git clone https://github.com/sagarku8434/Library-System.git
cd Library-System
npm install
npm run dev

Backend:
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