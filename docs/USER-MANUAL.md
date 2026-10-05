# Athena Library Operating Manual

A complete manual covering day-to-day operations for students and library administrators.

---

## 1. Student Portal Guide

### Reserving a Study Desk
1. Open the homepage and click **Seats & Live Map** (`/seats`).
2. Choose your start date, subscription duration (Daily, Monthly, Dual Shift), and shift timing (Morning, Afternoon, Evening, Full Day).
3. The interactive architectural map displays all 54 desks with live status:
   - 🟢 **Green**: Available
   - 🔵 **Blue**: Selected
   - 🟡 **Amber**: Held in checkout
   - 🔴 **Red**: Occupied
4. Click your desired desk, review the booking summary, and proceed to checkout.
5. Complete payment via Razorpay UPI or NetBanking. A verified receipt slip will be generated immediately.

### Dynamic QR Attendance
1. At the reception counter of Athena Library, locate the live iPad / screen displaying the rotating QR code.
2. Open your smartphone, navigate to **My Attendance** (`/student/attendance`).
3. Click **Scan Reception QR**. The camera scans the 30-second token, confirms your active booking, and logs your check-in timestamp.
4. When concluding your study shift, repeat the scan to record your check-out time.

### Renewals & Receipts
- **Renew Pass**: Go to `/student/renew` to retain your current desk for the subsequent monthly cycle with 1-click priority.
- **Download Receipts**: Go to `/student/payments` to print or save official GST-compliant payment slips.

---

## 2. Admin & Owner Command Portal Guide

### Dashboard Overview (`/admin/dashboard`)
- View total collections, occupancy percentages, today's attendance count, and pending requests in real-time.

### Reviewing & Approving Bookings (`/admin/requests`)
1. New online student bookings appear in the **Pending Requests** queue.
2. Review the student's name, assigned desk, and uploaded ID.
3. Click **Approve & Enable QR** to activate the student's pass.
4. If a conflict occurs or documents are mismatched, click **Reject & Refund** to automatically release the seat and initiate a payment refund.

### Offline Walk-in Admissions (`/admin/admissions`)
1. When a walk-in student visits the front desk, navigate to **Offline Admissions**.
2. Enter the student's name, phone, and verified physical ID.
3. Select an available desk from the live list.
4. Accept cash or reception UPI payment. The system immediately creates an active booking and printable pass without conflict.

### Live Attendance Audit (`/admin/attendance`)
- View the live stream of students inside each reading hall.
- Make administrative corrections to check-in/check-out timestamps if a student forgot their smartphone.

### Content & CMS Management (`/admin/website`)
- Modify the library name, promotional banners, operating hours, phone numbers, and physical location directly from the admin panel without modifying code.
