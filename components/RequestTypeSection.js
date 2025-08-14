import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAssignment } from 'react-icons/md';
// removed BsCreditCard icon in favor of provided imageicon too 
import { RiStickyNoteFill } from 'react-icons/ri';

const RequestTypeSection = ({ onPaymentClick, onNoteClick, defaultRequestType = 'Registration', currentActivity = 'Gym' }) => {
  const navigate = useNavigate();
  const requiredInfoIcon = (
    <img
      src="/Clip path group.png"
      width={28}
      height={28}
      alt="Required information"
      className="section-icon"
    />
  );

  return (
    <>
      {/* Required Information Section Header - No Background */}
      <div className="mb-24">
        <div className="flex items-center gap-12">
          {requiredInfoIcon}
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', letterSpacing: 0.1 }}>Required Information</span>
        </div>
      </div>

      {/* Request Type + Payment/Note Buttons Container */}
      <div className="flex justify-between items-start mb-32">
        {/* Left: Request Type */}
        <div style={{ flex: 1 }}>
          <div className="fw-600 mb-16 fs-16 color-1a1a1a">Request Type</div>
          <div className="flex items-center gap-32">
            <label className="flex items-center fs-15 fw-600 color-1a1a1a">
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
            <label className="flex items-center fs-15 fw-600 color-1a1a1a">
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
        <div className="flex items-center gap-24">
          {/* Payment button - Only show for Registration */}
          {defaultRequestType === 'Registration' && (
            <button 
              onClick={onPaymentClick}
              className="btn-ghost-purple"
              aria-label="Payment"
              title="Payment"
            >
              <img src="/payment.png" className="payment-icon" alt="Payment" />
            </button>
          )}
          <button 
            onClick={onNoteClick}
            className="btn-ghost-purple"
            aria-label="Note"
            title="Note"
          >
            <img src="/Notet.png" className="note-icon" alt="Note" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestTypeSection; 