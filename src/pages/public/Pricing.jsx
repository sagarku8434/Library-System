import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import PricingCard from '../../components/booking/PricingCard';
import { Check, HelpCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function Pricing() {
  const { pricingPlans, shifts } = useLibrary();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1] || pricingPlans[0]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    navigate('/seats');
  };

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
          <span className="badge badge-info" style={{ marginBottom: '8px' }}>Transparent Fee Structure</span>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            Flexible Study Plans & Timings
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            Choose between single 6-hour shifts, 12-hour intensive study blocks, or 24/7 dedicated passes. No hidden maintenance charges.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '24px', 
          marginBottom: '60px' 
        }}>
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.planId}
              plan={plan}
              isSelected={selectedPlan?.planId === plan.planId}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Shift Timings Breakdown */}
        <div className="card" style={{ marginBottom: '50px', background: '#f8fafc' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} style={{ color: 'var(--primary)' }} /> Available Study Shifts
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {shifts.map(shift => (
              <div key={shift.id} style={{ background: 'white', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>
                  {shift.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                  {shift.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Duration: {shift.durationHours} continuous hours
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', marginBottom: '30px' }}>
            Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Can someone else sit on my seat during other shifts?</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                For single-shift passes, the desk is exclusively yours during that specific shift time. If you want a completely private non-shared desk for 24 hours, choose the Full-Day Pass.
              </p>
            </div>
            <div className="card">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>How do I mark my daily attendance?</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Upon reaching the library reception desk, open your Student Portal, click "Self Attendance", and scan the live dynamic QR code displayed on the front desk.
              </p>
            </div>
            <div className="card">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Are fees refundable if I discontinue?</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Cancellations requested 48 hours prior to start date receive 100% refund. Active subscriptions can be surrendered under our pro-rated refund guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
