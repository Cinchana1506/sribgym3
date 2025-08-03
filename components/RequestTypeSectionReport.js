import React from 'react';

const RequestTypeSectionReport = ({ requestType }) => {
  return (
    <>
      {/* Request Type Container - No Note Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
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
                checked={requestType === 'Registration'} 
                disabled 
                style={{ 
                  marginRight: 8,
                  accentColor: '#1976d2',
                  transform: 'scale(1.2)'
                }} 
              /> Registration
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>
              <input 
                type="radio" 
                name="requestType" 
                checked={requestType === 'De-Registration'} 
                disabled 
                style={{ 
                  marginRight: 8,
                  accentColor: '#1976d2',
                  transform: 'scale(1.2)'
                }} 
              /> De-Registration
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestTypeSectionReport; 