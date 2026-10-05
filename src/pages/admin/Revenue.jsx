import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { TrendingUp, DollarSign, Download, ArrowUpRight, ShieldCheck, PieChart } from 'lucide-react';

export default function Revenue() {
  const { revenueStats, payments, bookings, shifts } = useLibrary();

  // Shift-wise revenue breakdown
  const shiftRevenue = shifts.map(s => {
    const shiftBookings = bookings.filter(b => b.shiftId === s.id && b.paymentStatus === 'paid');
    const total = shiftBookings.reduce((sum, b) => sum + b.amount, 0);
    return { name: s.name, total, count: shiftBookings.length };
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ReceiptNumber,StudentName,Amount,Method,Status,Date\n"
      + payments.map(p => `${p.receiptNumber},"${p.studentName}",${p.amount},"${p.method}",${p.status},${p.paidAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Athena_Revenue_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Revenue & Financial Analytics</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Collections audit, settlement reconciliation, and bank payout reports
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary" style={{ fontSize: '13px' }}>
          <Download size={15} /> Export Revenue CSV
        </button>
      </div>

      {/* Top 3 Metric Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>GROSS COLLECTIONS</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
            ₹{revenueStats.totalCollected.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '12px', color: '#16a34a' }}>All verified payment orders</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL REFUND DISBURSED</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#dc2626', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
            ₹{revenueStats.totalRefunded.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>From rejected / cancelled bookings</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>NET REVENUE SETTLED</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
            ₹{revenueStats.netRevenue.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '12px', color: '#16a34a' }}>Direct to Owner Bank Account</span>
        </div>
      </div>

      {/* Shift Breakdown */}
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Shift-Wise Revenue Breakdown</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {shiftRevenue.map((sr, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{sr.name}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                ₹{sr.total}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {sr.count} Active Bookings
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
