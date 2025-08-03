import React from 'react';

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  required = false, 
  disabled = false,
  style = {}
}) => {
  const selectStyle = {
    padding: '12px 16px',
    borderRadius: 5,
    border: '1px solid #E5E7EB',
    fontSize: 14,
    width: '100%',
    height: '44px',
    color: '#202224',
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
    background: disabled ? '#f8f9fa' : '#fff',
    boxSizing: 'border-box',
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
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={selectStyle}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect; 