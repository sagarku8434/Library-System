import mongoose from 'mongoose';

const librarySettingsSchema = new mongoose.Schema({
  libraryName: { type: String, default: 'ATHENA SMART STUDY LIBRARY' },
  tagline: { type: String, default: 'Quiet Architectural Study Pods · 24/7 Wi-Fi · Ergonomic Desks' },
  ownerName: { type: String, default: 'Vikramaditya Sharma' },
  ownerPhone: { type: String, default: '+91 98765 43210' },
  ownerEmail: { type: String, default: 'contact@athenalibrary.com' },
  address: { type: String, default: 'Plot 42, Knowledge Park III, Near Metro Station, Patna, Bihar - 800001' },
  operatingHours: { type: String, default: 'Open 24/7 (All 365 Days)' },
  capacity: { type: Number, default: 54 },
  razorpayMerchantId: { type: String, default: 'rzp_test_athena_official' },
  rules: [{ type: String }],
  refundPolicy: { type: String }
});

export const LibrarySettings = mongoose.model('LibrarySettings', librarySettingsSchema);
