import mongoose from 'mongoose';

const pricingPlanSchema = new mongoose.Schema({
  planId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  billingCycle: { type: String, enum: ['daily', 'monthly', 'quarterly'], default: 'monthly' },
  durationDays: { type: Number, required: true },
  shiftsAllowed: { type: Number, default: 1 },
  amount: { type: Number, required: true }, // Current price; snapshot price stored on Booking
  description: { type: String },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true }
});

export const PricingPlan = mongoose.model('PricingPlan', pricingPlanSchema);
