import React from 'react';

const ActionButton = ({ 
  variant = 'primary', // 'primary', 'secondary'
  onClick, 
  children, 
  style = {},
  ...props 
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '12px 32px',
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
      ...style
    };

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          background: '#fff',
          color: '#42a5f5',
          border: '2px solid #42a5f5'
        };
      default: // primary
        return {
          ...baseStyle,
          background: '#42a5f5',
          color: '#fff',
          border: 'none'
        };
    }
  };

  return (
    <button
      onClick={onClick}
      style={getButtonStyle()}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton; 