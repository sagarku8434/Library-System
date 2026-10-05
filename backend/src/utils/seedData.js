import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { Room } from '../models/Room.js';
import { Seat } from '../models/Seat.js';
import { PricingPlan } from '../models/PricingPlan.js';
import { LibrarySettings } from '../models/LibrarySettings.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/athena_library';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[Seed] Connected to MongoDB');

    // Clear existing
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await Room.deleteMany({});
    await Seat.deleteMany({});
    await PricingPlan.deleteMany({});
    await LibrarySettings.deleteMany({});

    // 1. Rooms
    await Room.insertMany([
      {
        roomId: 'room-gf',
        roomName: 'Hall of Socrates (Ground Floor)',
        floor: 'Ground Floor',
        facilities: ['Silent Zone', 'Central AC', 'High-Speed Wi-Fi', 'Power Sockets', 'Ergonomic Mesh Chairs'],
        capacity: 30
      },
      {
        roomId: 'room-ff',
        roomName: 'Hall of Aristotle (First Floor)',
        floor: 'First Floor',
        facilities: ['Cubicle Desks', 'Silent AC', 'Locker Facility', 'LED Lamps', 'CCTV Monitoring'],
        capacity: 24
      }
    ]);

    // 2. 54 Seats
    const seats = [
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
    await Seat.insertMany(seats);

    // 3. Pricing Plans
    await PricingPlan.insertMany([
      {
        planId: 'PLAN_DAILY_SHIFT',
        name: 'Single Shift - Daily Pass',
        billingCycle: 'daily',
        durationDays: 1,
        amount: 99,
        description: 'Single 6-hour shift access for urgent sessions',
        features: ['Any single 6-hr shift', 'High-speed Wi-Fi', 'Power socket access']
      },
      {
        planId: 'PLAN_MONTHLY_SINGLE',
        name: 'Single Shift - Monthly Pass',
        billingCycle: 'monthly',
        durationDays: 30,
        amount: 800,
        description: 'Fixed seat for 30 consecutive days in morning/evening',
        features: ['Fixed seat for 30 days', 'Choose your shift', 'Free locker access', 'Dynamic QR attendance']
      },
      {
        planId: 'PLAN_MONTHLY_DUAL',
        name: 'Dual Shift (12 Hours) - Monthly Pass',
        billingCycle: 'monthly',
        durationDays: 30,
        amount: 1400,
        description: 'Two continuous shifts for intensive preparation',
        features: ['Two continuous shifts (12 Hrs)', 'Reserved desk', 'High priority Wi-Fi', 'Locker included']
      },
      {
        planId: 'PLAN_MONTHLY_FULL',
        name: 'Full Day 24/7 Unlimited - Monthly Pass',
        billingCycle: 'monthly',
        durationDays: 30,
        amount: 2100,
        description: 'Round the clock dedicated non-shared desk',
        features: ['Exclusive non-sharing desk', '24/7 QR access', 'Personal locker', 'Tea/coffee discounts']
      }
    ]);

    // 4. Default Admin & Student
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    const studentPass = await bcrypt.hash('student123', salt);

    const admin = await User.create({
      name: 'Vikramaditya Sharma (Owner)',
      email: 'admin@athena.com',
      phone: '9876543210',
      passwordHash: adminPass,
      role: 'admin'
    });

    const student = await User.create({
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      phone: '9876512345',
      passwordHash: studentPass,
      role: 'student'
    });

    await StudentProfile.create({
      userId: student._id,
      address: 'Boring Road, Patna, Bihar',
      idType: 'Aadhaar Card',
      idNumber: 'XXXX-XXXX-4819',
      idDocumentRef: 'vault/private/rahul_aadhaar.pdf',
      verificationStatus: 'verified'
    });

    // 5. Settings
    await LibrarySettings.create({
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
        'Mobile phones must strictly be set to silent/vibrate mode.',
        'Desk sharing or transferring booking cards is strictly prohibited.',
        'Mark attendance using dynamic QR code upon entry and exit.'
      ],
      refundPolicy: 'Full refund if cancelled 48 hours prior to start date.'
    });

    console.log('[Seed] Database successfully seeded with Athena defaults!');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
}

seed();
