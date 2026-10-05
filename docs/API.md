# Athena Library REST API Documentation

This document defines the RESTful APIs powering both the Student and Admin portals. All secure endpoints require standard JWT authentication passed in the HTTP Authorization header: `Bearer <token>`.

---

## 1. Authentication Endpoints

### Register Student
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Rahul Kumar",
  "phone": "9876512345",
  "email": "rahul@gmail.com",
  "password": "securepassword",
  "address": "Boring Road, Patna, Bihar",
  "idType": "Aadhaar Card",
  "idNumber": "XXXX-XXXX-4819",
  "idDocumentRef": "private/docs/rahul_id.pdf"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": "651f8a...",
    "name": "Rahul Kumar",
    "email": "rahul@gmail.com",
    "role": "student"
  }
}
```

### Student & Admin Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "admin@athena.com",
  "password": "adminpassword"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": "651f9b...",
    "name": "Vikramaditya Sharma",
    "role": "admin"
  }
}
```

---

## 2. Seat Availability & Plans

### Get Live Seat Availability
- **Endpoint**: `GET /api/seats/availability?date=2026-10-05&shiftId=SHIFT_MORNING`
- **Access**: Public
- **Response** (`200 OK`):
```json
{
  "success": true,
  "date": "2026-10-05",
  "shiftId": "SHIFT_MORNING",
  "availability": {
    "A01": "available",
    "A02": "occupied",
    "A12": "held"
  }
}
```

### Temporary Checkout Hold
- **Endpoint**: `POST /api/bookings/hold`
- **Access**: Student
- **Request Body**:
```json
{
  "seatId": "A12",
  "date": "2026-10-05",
  "shiftId": "SHIFT_MORNING"
}
```
- **Response** (`200 OK` / `409 Conflict`):
```json
{
  "success": true,
  "message": "Desk held for 10 minutes checkout window"
}
```

---

## 3. Payments & Booking Engine

### Create Razorpay Order
- **Endpoint**: `POST /api/payments/order`
- **Access**: Student
- **Request Body**:
```json
{
  "bookingId": "ATH-BOOK-101",
  "amount": 800
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "order": {
    "id": "order_Ojh917823Ka",
    "amount": 80000,
    "currency": "INR"
  }
}
```

### Verify Payment & Commit Booking
- **Endpoint**: `POST /api/payments/verify`
- **Access**: Student
- **Request Body**:
```json
{
  "orderId": "order_Ojh917823Ka",
  "paymentId": "pay_Plq1092837f",
  "signature": "hmac_sha256_hex_digest",
  "bookingId": "ATH-BOOK-101",
  "amount": 800,
  "method": "Razorpay UPI"
}
```

---

## 4. Dynamic QR Attendance

### Reception Live Rotating QR Token
- **Endpoint**: `GET /api/attendance/live-qr`
- **Access**: Public (Mounted on physical library entrance screen)
- **Response** (`200 OK`):
```json
{
  "success": true,
  "token": "ATH_QR_1727859840_92FA10B",
  "validUntil": 1727859870000
}
```

### Student Self Check-in
- **Endpoint**: `POST /api/attendance/check-in`
- **Access**: Authenticated Student with Approved Booking
- **Request Body**:
```json
{
  "token": "ATH_QR_1727859840_92FA10B"
}
```

### Student Self Check-out
- **Endpoint**: `POST /api/attendance/check-out`
- **Access**: Authenticated Student

---

## 5. Admin Management Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Collections, Occupancy Rate, Pending Requests |
| `GET` | `/api/admin/requests` | Queue of pending unverified student bookings |
| `PATCH` | `/api/admin/bookings/:id/approve` | Approve booking & enable dynamic attendance QR |
| `PATCH` | `/api/admin/bookings/:id/reject` | Reject booking, release allocations, issue refund |
| `GET` | `/api/admin/students` | Registered student directory & document references |
| `GET` | `/api/admin/payments` | Master transactions ledger & cash entries |
| `GET` | `/api/admin/revenue` | Financial totals, shift breakdown, CSV export |
| `POST` | `/api/admin/offline-bookings` | Walk-in student admission & immediate seat claim |
| `PATCH` | `/api/admin/settings` | Update library rules, owner contacts, and branding |
