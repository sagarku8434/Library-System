import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import Modal from '../../components/common/Modal';
import { Clock, Plus, Edit2, Check, Sparkles } from 'lucide-react';

export default function PricingManagement() {
  const { pricingPlans, shifts, updatePricingPlan, addPricingPlan } = useLibrary();
  const [editingPlan, setEditingPlan] = useState(null);
  const [editAmount, setEditAmount] = useState(0);

  const handleStartEdit = (plan) => {
    setEditingPlan(plan);
    setEditAmount(plan.amount);
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      updatePricingPlan(editingPlan.planId, { amount: Number(editAmount) });
      setEditingPlan(null);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Pricing Plans & Shift Configuration</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Update membership fee tiers, daily pricing, and shift slot boundaries
        </p>
      </div>

      {/* Pricing Plans Table/Cards */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>
          Active Subscription Plans
        </h3>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Billing Cycle</th>
                <th>Duration</th>
                <th>Current Fee</th>
                <th>Snapshot Rule</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map(plan => (
                <tr key={plan.planId}>
                  <td>
                    <div style={{ fontWeight: '700' }}>{plan.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{plan.description}</div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{plan.billingCycle}</td>
                  <td>{plan.durationDays} Days</td>
                  <td style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                    ₹{plan.amount}
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '11px' }}>
                      Locked Snapshot on Booking
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStartEdit(plan)}
                      className="btn btn-secondary"
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      <Edit2 size={13} /> Edit Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shift Slots Configuration */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} style={{ color: 'var(--primary)' }} />
          Configured Study Shift Timings
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {shifts.map(shift => (
            <div key={shift.id} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '15px' }}>{shift.name}</strong>
                <span className="badge badge-neutral" style={{ fontSize: '11px' }}>{shift.durationHours} hrs</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                {shift.label}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                {shift.isFullDay ? 'Blocks all overlapping individual shifts' : 'Can coexist with other non-overlapping shifts'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingPlan}
        onClose={() => setEditingPlan(null)}
        title={`Update Pricing: ${editingPlan?.name}`}
      >
        {editingPlan && (
          <div>
            <div className="form-group">
              <label className="form-label">Subscription Price (₹ INR)</label>
              <input
                type="number"
                className="form-input"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                Note: Updating the price takes effect for future bookings. Existing historical bookings retain their original snapshot price.
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setEditingPlan(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleSavePlan} className="btn btn-primary">Save New Price</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
