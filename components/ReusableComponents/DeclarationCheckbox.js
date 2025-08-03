import React from 'react';

const DeclarationCheckbox = ({ 
  label, 
  checked = true, 
  disabled = false,
  onChange,
  style = {}
}) => {
  const checkboxStyle = {
    marginTop: 2,
    width: 19,
    height: 19,
    background: checked ? '#38AEE0' : '#fff',
    borderRadius: 4,
    boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 14,
    color: '#202224',
    fontWeight: 400,
    gap: 12,
    padding: 0,
    margin: 0,
    width: '100%',
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
  };

  return (
    <label style={labelStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={checkboxStyle}
      />
      <span style={{ width: '100%' }}>{label}</span>
    </label>
  );
};

export default DeclarationCheckbox; 