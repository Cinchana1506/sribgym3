import React, { useState, useEffect } from 'react';
import { useBatchTimings } from '../hooks';

const TimeSlotSelector = ({ 
  selectedSlot, 
  onSelect, 
  gymtype, 
  gymid, 
  mempid,
  autoFetch = true 
}) => {
  const [internalSelected, setInternalSelected] = useState(null);
  const currentSelected = selectedSlot !== undefined ? selectedSlot : internalSelected;

  // Use the batch timings hook
  const { data, loading, error, fetchBatchTimings } = useBatchTimings({
    gymtype,
    gymid,
    mempid,
    autoFetch,
  });

  // Extract timing slots from API data
  const slots = data?.data?.map(timing => ({
    label: timing.timingDesc,
    available: timing.userCount < timing.maxCount,
    userCount: timing.userCount,
    maxCount: timing.maxCount,
    gymTID: timing.gymTID,
    isSelected: timing.isSelected,
  })) || [];

  const handleSelect = (label) => {
    if (onSelect) onSelect(label);
    else setInternalSelected(label);
  };

  // Show loading state
  if (loading) {
    return (
      <section style={{ background: 'none', padding: 0, margin: '0 0 24px 0' }}>
        <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15, color: '#222' }}>
          Select Time Slots
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#1976d2' }}>
          Loading available time slots...
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section style={{ background: 'none', padding: 0, margin: '0 0 24px 0' }}>
        <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15, color: '#222' }}>
          Select Time Slots
        </div>
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
          Error loading time slots: {error}
        </div>
        <button
          onClick={() => fetchBatchTimings()}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section style={{ background: 'none', padding: 0, margin: '0 0 24px 0' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15, color: '#222' }}>
        Select Time Slots
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        {slots.map((slot) => (
          <button
            key={slot.label}
            style={{
              padding: '10px 24px',
              borderRadius: 7,
              border: currentSelected === slot.label ? '2.5px solid #1976d2' : '1.5px solid #bdbdbd',
              background: currentSelected === slot.label ? '#e3f0fd' : '#fff',
              color: currentSelected === slot.label ? '#1976d2' : '#222',
              fontWeight: 500,
              fontSize: 15,
              minWidth: 170,
              boxShadow: '0 1px 2px #f0f0f0',
              cursor: slot.available ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              opacity: slot.available ? 1 : 0.6,
            }}
            onClick={() => slot.available && handleSelect(slot.label)}
            disabled={!slot.available}
            title={slot.available ? `${slot.userCount}/${slot.maxCount} users` : 'Slot is full'}
          >
            <div>{slot.label}</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              {slot.userCount}/{slot.maxCount} users
            </div>
          </button>
        ))}
        <button
          style={{
            padding: '10px 24px',
            borderRadius: 7,
            border: '1.5px solid #f44336',
            background: '#fff',
            color: '#f44336',
            fontWeight: 600,
            fontSize: 15,
            minWidth: 170,
            boxShadow: '0 1px 2px #f0f0f0',
            cursor: 'pointer',
          }}
        >
          Notify me!
        </button>
      </div>
    </section>
  );
};

export default TimeSlotSelector; 