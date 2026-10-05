import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import ShiftSelector from '../../components/booking/ShiftSelector';
import SeatMap from '../../components/booking/SeatMap';
import SeatCard from '../../components/booking/SeatCard';
import BookingSummary from '../../components/booking/BookingSummary';
import { Armchair, AlertCircle } from 'lucide-react';

export default function Seats() {
  const { shifts, pricingPlans, rooms, holdSeat } = useLibrary();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedShift, setSelectedShift] = useState(shifts[0] || null);
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1] || pricingPlans[0]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedRoom = rooms.find(r => r.roomId === selectedSeat?.roomId);

  const handleProceedToCheckout = () => {
    if (!selectedSeat) {
      setErrorMsg('Please select a desk from the seat map to proceed.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    // Acquire 10-minute temporary checkout hold
    const holdResult = holdSeat(
      selectedSeat.seatId, 
      selectedDate, 
      selectedShift.id, 
      user?.userId || 'GUEST_USER'
    );

    if (!holdResult.success) {
      setIsLoading(false);
      setErrorMsg(`Seat ${selectedSeat.seatNumber} is currently ${holdResult.reason}. Please select another desk.`);
      return;
    }

    // Navigate to checkout
    navigate('/checkout', {
      state: {
        seat: selectedSeat,
        room: selectedRoom,
        shift: selectedShift,
        plan: selectedPlan,
        startDate: selectedDate
      }
    });
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '30px' }}>
          <span className="badge badge-info" style={{ marginBottom: '8px' }}>Real-Time Availability</span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>
            Interactive Seat Selection
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Choose your date, preferred shift, and pick any available desk. Overlapping slots are conflict-protected.
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step 1: Shift & Date */}
        <ShiftSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedShift={selectedShift}
          setSelectedShift={setSelectedShift}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        {/* Step 2: Seat Map */}
        <SeatMap
          selectedDate={selectedDate}
          selectedShift={selectedShift}
          selectedSeat={selectedSeat}
          onSelectSeat={(seat) => {
            setSelectedSeat(seat);
            setErrorMsg(null);
          }}
        />

        {/* Step 3: Selected Desk Info & Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '14px' }}>Selected Desk Details</h3>
            {selectedSeat ? (
              <SeatCard seat={selectedSeat} room={selectedRoom} />
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                <Armchair size={32} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                <span>No desk selected. Click an available green desk above.</span>
              </div>
            )}
          </div>

          <div>
            <BookingSummary
              seat={selectedSeat}
              shift={selectedShift}
              plan={selectedPlan}
              startDate={selectedDate}
              isLoading={isLoading}
              onProceed={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
