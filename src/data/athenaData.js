// Initial seed data and local-first store for Athena Library

export const INITIAL_ROOMS = [
  {
    roomId: 'room-gf',
    roomName: 'Hall of Socrates (Ground Floor)',
    floor: 'Ground Floor',
    facilities: ['Silent Zone', 'Central AC', 'High-Speed Wi-Fi', 'Personal Charging Points', 'Ergonomic Mesh Chairs'],
    capacity: 30
  },
  {
    roomId: 'room-ff',
    roomName: 'Hall of Aristotle (First Floor)',
    floor: 'First Floor',
    facilities: ['Cubicle Desks', 'Silent AC', 'Locker Facility', 'LED Desk Lamps', 'CCTV Monitoring'],
    capacity: 24
  }
];

export const INITIAL_SHIFTS = [
  { id: 'SHIFT_MORNING', name: 'Morning Shift', startTime: '06:00', endTime: '12:00', label: '06:00 AM - 12:00 PM', durationHours: 6 },
  { id: 'SHIFT_AFTERNOON', name: 'Afternoon Shift', startTime: '12:00', endTime: '18:00', label: '12:00 PM - 06:00 PM', durationHours: 6 },
  { id: 'SHIFT_EVENING', name: 'Evening Shift', startTime: '18:00', endTime: '23:59', label: '06:00 PM - 12:00 AM', durationHours: 6 },
  { id: 'SHIFT_FULL_DAY', name: 'Full Day (All Shifts)', startTime: '06:00', endTime: '23:59', label: '06:00 AM - 12:00 AM (18 Hrs)', durationHours: 18, isFullDay: true },
  { id: 'SHIFT_24X7', name: '24/7 Unlimited Pass', startTime: '00:00', endTime: '23:59', label: '24 Hours Dedicated Desk', durationHours: 24, isFullDay: true }
];

export const INITIAL_PRICING_PLANS = [
  {
    planId: 'PLAN_DAILY_SHIFT',
    name: 'Single Shift - Daily Pass',
    billingCycle: 'daily',
    durationDays: 1,
    shiftsAllowed: 1,
    amount: 99,
    description: 'Ideal for trial days or urgent study sessions.',
    features: ['Any single 6-hr shift', 'High-speed Wi-Fi', 'Power socket access', 'Filtered RO water']
  },
  {
    planId: 'PLAN_MONTHLY_SINGLE',
    name: 'Single Shift - Monthly',
    billingCycle: 'monthly',
    durationDays: 30,
    shiftsAllowed: 1,
    amount: 800,
    popular: true,
    description: 'Most popular for college students and aspirants.',
    features: ['Fixed seat for 30 days', 'Choose Morning, Afternoon or Evening', 'Free locker access', 'Attendance tracking']
  },
  {
    planId: 'PLAN_MONTHLY_DUAL',
    name: 'Dual Shift (12 Hours) - Monthly',
    billingCycle: 'monthly',
    durationDays: 30,
    shiftsAllowed: 2,
    amount: 1400,
    description: 'Perfect for intensive competitive exams (UPSC/GATE/CAT).',
    features: ['Two continuous shifts (12 Hrs)', 'Reserved desk', 'High priority Wi-Fi', 'Locker included']
  },
  {
    planId: 'PLAN_MONTHLY_FULL',
    name: 'Full Day Pass - Monthly',
    billingCycle: 'monthly',
    durationDays: 30,
    shiftsAllowed: 4,
    amount: 2100,
    description: '24/7 round-the-clock uninterrupted access.',
    features: ['Exclusive non-sharing desk', '24/7 biometric / QR access', 'Personal locker', 'Tea/coffee dispenser discounts']
  }
];

// Generate 54 realistic seats
export const INITIAL_SEATS = [
  ...Array.from({ length: 30 }, (_, i) => ({
    seatId: `A${String(i + 1).padStart(2, '0')}`,
    seatNumber: `A${String(i + 1).padStart(2, '0')}`,
    roomId: 'room-gf',
    row: Math.floor(i / 6) + 1,
    col: (i % 6) + 1,
    activeStatus: 'active',
    hasSocket: true,
    hasCubicle: i % 2 === 0,
    hasLamp: true
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    seatId: `B${String(i + 1).padStart(2, '0')}`,
    seatNumber: `B${String(i + 1).padStart(2, '0')}`,
    roomId: 'room-ff',
    row: Math.floor(i / 6) + 1,
    col: (i % 6) + 1,
    activeStatus: 'active',
    hasSocket: true,
    hasCubicle: true,
    hasLamp: true
  }))
];

export const INITIAL_SETTINGS = {
  libraryName: 'ATHENA SMART STUDY LIBRARY',
  tagline: 'Quiet Architectural Study Pods · 24/7 Wi-Fi · Ergonomic Desks',
  ownerName: 'Vikramaditya Sharma',
  ownerPhone: '+91 98765 43210',
  ownerEmail: 'contact@athenalibrary.com',
  address: 'Plot 42, Knowledge Park III, Near Metro Station, Patna, Bihar - 800001',
  operatingHours: 'Open 24/7 (All 365 Days)',
  capacity: 54,
  razorpayMerchantId: 'rzp_test_athena_official',
  rules: [
    'Strict silence must be maintained at all times inside reading halls.',
    'Mobile phones must strictly be set to silent/vibrate mode. Calls must be attended in the lounge.',
    'Desk sharing or transferring booking cards to another person is strictly prohibited.',
    'Mark attendance using the dynamic QR code scanner at the reception desk upon entry and exit.',
    'Eating meals is allowed only in the designated cafeteria zone.',
    'Personal belongings should be placed in lockers; management is not liable for unattended items.'
  ],
  refundPolicy: 'Full refund if booking is rejected by admin or cancelled 48 hours prior to start date. Once the shift starts, refunds are prorated as per terms.'
};

export const INITIAL_USERS = [
  {
    userId: 'USR_ADMIN_01',
    name: 'Vikramaditya Sharma (Admin)',
    email: 'admin@athena.com',
    phone: '9876543210',
    role: 'admin',
    accountStatus: 'active'
  },
  {
    userId: 'USR_STU_01',
    name: 'Rahul Kumar',
    email: 'rahul@gmail.com',
    phone: '9876512345',
    role: 'student',
    accountStatus: 'active',
    profile: {
      address: 'Boring Road, Patna, Bihar - 800001',
      idType: 'Aadhaar Card',
      idNumber: 'XXXX-XXXX-4819',
      idDocumentRef: 'private/docs/rahul_aadhaar.pdf',
      verificationStatus: 'verified',
      registeredAt: '2026-09-15'
    }
  },
  {
    userId: 'USR_STU_02',
    name: 'Ananya Mishra',
    email: 'ananya@gmail.com',
    phone: '9812345678',
    role: 'student',
    accountStatus: 'active',
    profile: {
      address: 'Kankarbagh, Patna, Bihar - 800020',
      idType: 'College ID (Patna University)',
      idNumber: 'PU-2024-8891',
      idDocumentRef: 'private/docs/ananya_college_id.pdf',
      verificationStatus: 'verified',
      registeredAt: '2026-09-28'
    }
  }
];

export const INITIAL_BOOKINGS = [
  {
    bookingId: 'ATH-BOOK-101',
    studentId: 'USR_STU_01',
    studentName: 'Rahul Kumar',
    studentPhone: '9876512345',
    studentEmail: 'rahul@gmail.com',
    seatId: 'A12',
    seatNumber: 'A12',
    roomId: 'room-gf',
    roomName: 'Hall of Socrates (Ground Floor)',
    planId: 'PLAN_MONTHLY_SINGLE',
    planName: 'Single Shift - Monthly',
    shiftId: 'SHIFT_MORNING',
    shiftName: 'Morning Shift (06:00 AM - 12:00 PM)',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    amount: 800,
    paymentStatus: 'paid',
    paymentId: 'PAY_RZP_991823',
    approvalStatus: 'approved',
    attendanceEnabled: true,
    bookingType: 'online',
    createdAt: '2026-10-01T09:15:00Z'
  },
  {
    bookingId: 'ATH-BOOK-102',
    studentId: 'USR_STU_02',
    studentName: 'Ananya Mishra',
    studentPhone: '9812345678',
    studentEmail: 'ananya@gmail.com',
    seatId: 'B04',
    seatNumber: 'B04',
    roomId: 'room-ff',
    roomName: 'Hall of Aristotle (First Floor)',
    planId: 'PLAN_MONTHLY_SINGLE',
    planName: 'Single Shift - Monthly',
    shiftId: 'SHIFT_EVENING',
    shiftName: 'Evening Shift (06:00 PM - 12:00 AM)',
    startDate: '2026-10-03',
    endDate: '2026-11-02',
    amount: 800,
    paymentStatus: 'paid',
    paymentId: 'PAY_RZP_992144',
    approvalStatus: 'pending',
    attendanceEnabled: false,
    bookingType: 'online',
    createdAt: '2026-10-02T11:30:00Z'
  }
];

export const INITIAL_PAYMENTS = [
  {
    paymentId: 'PAY_RZP_991823',
    bookingId: 'ATH-BOOK-101',
    studentId: 'USR_STU_01',
    studentName: 'Rahul Kumar',
    amount: 800,
    method: 'Razorpay UPI (rahul@okaxis)',
    providerOrderId: 'order_Oihw82hH812',
    providerPaymentId: 'pay_Pkj9981273h',
    status: 'success',
    paidAt: '2026-10-01T09:18:22Z',
    receiptNumber: 'ATH-REC-2026-001'
  },
  {
    paymentId: 'PAY_RZP_992144',
    bookingId: 'ATH-BOOK-102',
    studentId: 'USR_STU_02',
    studentName: 'Ananya Mishra',
    amount: 800,
    method: 'Razorpay NetBanking (HDFC)',
    providerOrderId: 'order_Ojh917823Ka',
    providerPaymentId: 'pay_Plq1092837f',
    status: 'success',
    paidAt: '2026-10-02T11:32:10Z',
    receiptNumber: 'ATH-REC-2026-002'
  }
];

export const INITIAL_ATTENDANCE = [
  {
    attendanceId: 'ATT_20261002_001',
    studentId: 'USR_STU_01',
    studentName: 'Rahul Kumar',
    seatNumber: 'A12',
    date: '2026-10-02',
    shiftId: 'SHIFT_MORNING',
    checkIn: '06:14 AM',
    checkOut: '11:52 AM',
    method: 'Dynamic QR',
    status: 'present'
  },
  {
    attendanceId: 'ATT_20261001_001',
    studentId: 'USR_STU_01',
    studentName: 'Rahul Kumar',
    seatNumber: 'A12',
    date: '2026-10-01',
    shiftId: 'SHIFT_MORNING',
    checkIn: '06:05 AM',
    checkOut: '11:45 AM',
    method: 'Dynamic QR',
    status: 'present'
  }
];
