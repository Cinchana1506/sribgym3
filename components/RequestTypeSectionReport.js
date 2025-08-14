import React from 'react';
// styles consolidated globally in App

const RequestTypeSectionReport = ({ requestType }) => {
  return (
    <>
      {/* Request Type Container - No Note Button */}
      <div className="request-type-container">
        {/* Left: Request Type */}
        <div className="request-type-left">
          <div className="request-type-title">Request Type</div>
          <div className="request-type-options">
            <label className="request-type-label">
              <input 
                type="radio" 
                name="requestType" 
                checked={requestType === 'Registration'} 
                disabled 
                className="radio-control"
              /> Registration
            </label>
            <label className="request-type-label">
              <input 
                type="radio" 
                name="requestType" 
                checked={requestType === 'De-Registration'} 
                disabled 
                className="radio-control"
              /> De-Registration
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestTypeSectionReport; 