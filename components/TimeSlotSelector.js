import React, { useState } from 'react';

const slots = [
  { label: '8:00AM to 9:00 AM', available: true },
  { label: '9.15 AM to 10.15 AM', available: true },
  { label: '4.00 PM to 5.00 PM', available: true },
];

const TimeSlotSelector = ({ selectedSlot, onSelect }) => {
  const [internalSelected, setInternalSelected] = useState(null);
  const currentSelected = selectedSlot !== undefined ? selectedSlot : internalSelected;

  const handleSelect = (label) => {
    if (onSelect) onSelect(label);
    else setInternalSelected(label);
  };

  return (
    <section style={{ background: 'none', padding: 0, margin: '0 0 24px 0' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15, color: '#222' }}>Select Time Slots</div>
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
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => handleSelect(slot.label)}
          >
            {slot.label}
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