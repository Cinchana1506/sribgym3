import React from 'react';

const FormInput = ({ 
  label, 
  type = "text", 
  value,
  onChange,
  required = false, 
  disabled = false,
  placeholder,
  style = {},
  ...props 
}) => {
  const inputStyle = {
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
    fontSize: 14,
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
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyle}
        {...props}
      />
    </div>
  );
};

export default FormInput; 