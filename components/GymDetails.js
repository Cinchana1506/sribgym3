import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { FormInput, FormSelect, ActivityScheduleGrid } from './ReusableComponents';

const GymDetails = ({ state, onActivityChange }) => {
  const [activity, setActivity] = useState('Gym');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);

  const handleChange = (e) => {
    setActivity(e.target.value);
    if (onActivityChange) onActivityChange(e.target.value);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleFileAttach = (file) => {
    setAttachedFile(file);
  };

  const handleFileRemove = () => {
    setAttachedFile(null);
  };

  const timeSlots = [
    '8.00 AM to 9.00 AM',
    '9.15 AM to 10.15 AM',
    '4.00 PM to 5.00 PM',
    '5.30 PM to 6.30 PM'
  ];

  const getStatement = () => {
    return activity === 'Group Exercise' 
      ? 'Maximum Users will be 30 & Minimum of 5 users in each slot per batch for Group Exercises.'
      : 'Maximum User will be 70 per batch for Gym';
  };

  return (
    <section style={{ background: 'none', border: 'none', borderRadius: 0, padding: 0, margin: 0, marginBottom: 0, boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2, whiteSpace: 'nowrap' }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Gym Details</span>
        <span style={{ color: '#98A2B3', fontWeight: 400, fontSize: 15, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>&nbsp;• {getStatement()}</span>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', marginBottom: 0, marginTop: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <FormSelect
            label="Gym Activity"
            value={activity}
            onChange={handleChange}
            options={['Group Exercise', 'Gym']}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <FormInput
            label="Apply Start Date"
            type="date"
            defaultValue="2025-05-24"
            required={true}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <FormInput
            label="Apply End Date"
            type="date"
            defaultValue="2025-06-12"
            required={true}
          />
        </div>
      </div>

      {/* Activity Details Section - Only show for Group Exercise */}
      {activity === 'Group Exercise' && (
        <div style={{ marginTop: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Activity Details</div>
          <ActivityScheduleGrid />
        </div>
      )}

      {/* Select Time Slots Section - Only show for Group Exercise */}
      {activity === 'Group Exercise' && (
        <div style={{ marginTop: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
            {state === 'deregistration' ? 'Time Slot' : 'Select Time Slots'}
          </div>
          {state === 'deregistration' ? (
            // Single dropdown for deregistration
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
              <FormSelect
                value={selectedTimeSlot || ''}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                options={['', ...timeSlots]}
              />
            </div>
          ) : (
            // Multiple buttons for registration
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 7,
                    border: selectedTimeSlot === slot ? '2.5px solid #1976d2' : '1.5px solid #bdbdbd',
                    background: selectedTimeSlot === slot ? '#e3f0fd' : '#fff',
                    color: selectedTimeSlot === slot ? '#1976d2' : '#202224',
                    fontWeight: 500,
                    fontSize: 15,
                    minWidth: 170,
                    boxShadow: '0 1px 2px #f0f0f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
                  }}
                  onClick={() => handleTimeSlotSelect(slot)}
                >
                  {slot}
                </button>
              ))}
              {selectedTimeSlot && (
                <button style={{
                  padding: '10px 24px',
                  borderRadius: 7,
                  border: '1.5px solid #f44336',
                  background: '#fff',
                  color: '#f44336',
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
                }}>
                  Notify me!
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* File Upload Section - Show for both Gym and Group Exercise, but not for deregistration */}
      {state !== 'deregistration' && (
        <FileUpload 
          state={state} 
          activity={activity} 
          attachedFile={attachedFile}
          onAttach={handleFileAttach}
          onRemove={handleFileRemove}
        />
      )}
    </section>
  );
};

export default GymDetails; 