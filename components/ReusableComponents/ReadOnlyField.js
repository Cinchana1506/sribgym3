import React from 'react';

const ReadOnlyField = ({ 
  label, 
  value, 
  required = false,
  style = {}
}) => {
  const fieldStyle = {
    padding: '12px 16px',
    borderRadius: 5,
    border: '1px solid #E5E7EB',
    fontSize: 14,
    width: '100%',
    height: '44px',
    color: '#202224',
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
    background: '#f8f9fa',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    ...style
  };

  const labelStyle = {
    fontSize: 13,
    color: '#202224',
    fontWeight: 700,
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
    marginBottom: 4
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: '#f44336' }}>*</span>}
      </label>
      <div style={fieldStyle}>
        {value}
      </div>
    </div>
  );
};

export default ReadOnlyField; 