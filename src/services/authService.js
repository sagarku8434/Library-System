import api from './api';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.patch('/students/me/profile', profileData),
};

export const bookingService = {
  getAvailability: (date, shiftId) => api.get(`/seats/availability?date=${date}&shiftId=${shiftId}`),
  getPricingPlans: () => api.get('/pricing'),
  holdSeat: (seatId, date, shiftId) => api.post('/bookings/hold', { seatId, date, shiftId }),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: () => api.get('/students/me/bookings'),
  approveBooking: (bookingId) => api.patch(`/admin/bookings/${bookingId}/approve`),
  rejectBooking: (bookingId, reason) => api.patch(`/admin/bookings/${bookingId}/reject`, { reason }),
};

export const paymentService = {
  createOrder: (bookingId, amount) => api.post('/payments/order', { bookingId, amount }),
  verifyPayment: (paymentData) => api.post('/payments/verify', paymentData),
  getMyReceipt: (receiptId) => api.get(`/students/me/receipts/${receiptId}`),
};

export const attendanceService = {
  checkIn: (qrToken) => api.post('/attendance/check-in', { token: qrToken }),
  checkOut: (qrToken) => api.post('/attendance/check-out', { token: qrToken }),
  getMyAttendance: () => api.get('/students/me/attendance'),
};
