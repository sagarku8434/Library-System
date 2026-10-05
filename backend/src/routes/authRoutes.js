import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to sign JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'athena_secret_key_2026', {
    expiresIn: '30d'
  });
};

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, phone, email, password, address, idType, idNumber, idDocumentRef } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      phone,
      email: email.toLowerCase(),
      passwordHash,
      role: 'student'
    });

    const profile = await StudentProfile.create({
      userId: user._id,
      address: address || '',
      idType: idType || 'Aadhaar Card',
      idNumber: idNumber || 'PENDING-VERIFY',
      idDocumentRef: idDocumentRef || 'private/docs/uploaded_id.pdf',
      verificationStatus: 'verified'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    const profile = await StudentProfile.findOne({ userId: user._id });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  const profile = await StudentProfile.findOne({ userId: req.user._id });
  res.json({
    success: true,
    user: {
      ...req.user.toObject(),
      profile
    }
  });
});

export default router;
