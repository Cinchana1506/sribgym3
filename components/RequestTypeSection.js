import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAssignment } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import { RiStickyNoteFill } from 'react-icons/ri';

const RequestTypeSection = ({ onPaymentClick, onNoteClick, defaultRequestType = 'Registration', currentActivity = 'Gym' }) => {
  const navigate = useNavigate();
  const requiredInfoIcon = <MdAssignment size={28} color="#4caf50" style={{ marginRight: 10, verticalAlign: 'middle' }} />;

  return (
    <>
      {/* Required Information Section Header - No Background */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {requiredInfoIcon}
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', letterSpacing: 0.1 }}>Required Information</span>
        </div>
      </div>

      {/* Request Type + Payment/Note Buttons Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32
      }}>
        {/* Left: Request Type */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 16, color: '#1a1a1a' }}>Request Type</div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>
              <input 
                type="radio" 
                name="requestType" 
                defaultChecked={defaultRequestType === 'Registration'} 
                onChange={() => {
                  if (defaultRequestType === 'De-Registration') {
                    navigate('/employee');
                  }
                }}
                style={{ marginRight: 8 }} 
              /> Registration
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>
              <input 
                type="radio" 
                name="requestType" 
                defaultChecked={defaultRequestType === 'De-Registration'} 
                onChange={() => {
                  if (defaultRequestType === 'Registration') {
                    if (currentActivity === 'Gym') {
                      navigate('/employee-deregistration-gym');
                    } else if (currentActivity === 'Group Exercise') {
                      navigate('/employee-deregistration-group-exercise');
                    }
                  }
                }}
                style={{ marginRight: 8 }} 
              /> De-Registration
            </label>
          </div>
        </div>

        {/* Right: Payment and Note Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Payment button - Only show for Registration */}
          {defaultRequestType === 'Registration' && (
            <button 
              onClick={onPaymentClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B5CF6',
                fontWeight: 600,
                fontSize: 15,
                padding: '8px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
                borderRadius: 6,
                transition: 'background-color 0.2s'
              }}
            >
              <BsCreditCard size={18} />
              <span>Payment</span>
            </button>
          )}
          <button 
            onClick={onNoteClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#8B5CF6',
              fontWeight: 600,
              fontSize: 15,
              padding: '8px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              borderRadius: 6,
              transition: 'background-color 0.2s'
            }}
          >
            <RiStickyNoteFill size={18} />
            <span>Note</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestTypeSection; 