import React from 'react';

const FormContainer = ({ 
  children, 
  style = {},
  marginBottom = 32
}) => {
  return (
    <div style={{
      background: '#fafbfb',
      borderRadius: 12,
      padding: '32px',
      marginBottom: marginBottom,
      boxShadow: '0 1px 4px #f3f3f3',
      ...style
    }}>
      {children}
    </div>
  );
};

export default FormContainer; 