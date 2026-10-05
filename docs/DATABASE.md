# Athena Library Database Architecture & Schemas

The database layer utilizes MongoDB with atomic transaction safety and compound indexes to ensure zero double-booking occurrences across overlapping shifts.

---

## 1. Collections & Schema Design

### `users`
Stores student accounts, library administrators, and staff.
```json
{
  "_id": "ObjectId",
  "name": "Rahul Kumar",
  "phone": "9876512345",
  "email": "rahul@gmail.com",
  "passwordHash": "$2a$10$...",
  "role": "student | admin | staff",
  "accountStatus": "active | suspended",
  "createdAt": "ISODate"
}
```
- **Indexes**: `email` (unique), `phone` (index), `role` (index).

### `studentProfiles`
Stores personal identification details under Indian DPDP data protection guidelines.
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "address": "Boring Road, Patna, Bihar",
  "idType": "Aadhaar Card | College ID | Voter ID | Driving License",
  "idNumber": "XXXX-XXXX-4819",
  "idDocumentRef": "vault/private/rahul_aadhaar.pdf",
  "verificationStatus": "verified | pending | rejected"
}
```

### `rooms` & `seats`
Physical architecture representing reading halls and individual desks.
```json
// seats
{
  "_id": "ObjectId",
  "seatId": "A12",
  "seatNumber": "A12",
  "roomId": "room-gf",
  "activeStatus": "active | disabled | maintenance",
  "hasSocket": true,
  "hasCubicle": true,
  "hasLamp": true
}
```

### `seatAllocations` (Atomic Conflict Protection)
Tracks active claims per seat, date, and shift.
```json
{
  "_id": "ObjectId",
  "bookingId": "ATH-BOOK-101",
  "seatId": "A12",
  "date": "2026-10-05",
  "shiftId": "SHIFT_MORNING",
  "reservationStatus": "active | held | released",
  "expiresAt": "ISODate"
}
```
- **Compound Index**: `{ seatId: 1, date: 1, shiftId: 1, reservationStatus: 1 }`

---

## 2. Multi-Day Conflict-Safe Availability Engine

### Conflict Rules:
1. **Direct Shift Conflict**: If seat `A12` on `2026-10-05` has an active record for `SHIFT_MORNING`, another student cannot book `SHIFT_MORNING` on `A12`.
2. **Full-Day Blocking**: If seat `A12` on `2026-10-05` is booked for `SHIFT_FULL_DAY` (or `SHIFT_24X7`), it blocks **all** individual shifts (`SHIFT_MORNING`, `SHIFT_AFTERNOON`, `SHIFT_EVENING`).
3. **Reverse Full-Day Blocking**: If any individual shift is booked on `A12`, no student can book `SHIFT_FULL_DAY` for that seat.
4. **Checkout Hold**: During payment checkout, the seat is held with status `held` and a 10-minute expiry timestamp `expiresAt`. If payment fails, the hold naturally expires.
5. **Rejection & Cancellation**: When an admin rejects a booking or a student cancels, all allocation records for that `bookingId` are released atomically, restoring the seat to public availability.
