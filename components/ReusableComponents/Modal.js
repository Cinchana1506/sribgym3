import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'medium',
  style = {}
}) => {
  if (!isOpen) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: '500px', maxWidth: '90vw' };
      case 'large':
        return { width: '1100px', maxWidth: '90vw' };
      default: // medium
        return { width: '500px', maxWidth: '90vw' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      ...style
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 55,
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        ...getSizeStyles()
      }}>
        {title && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            position: 'relative'
          }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0,
              letterSpacing: 0.1
            }}>
              {title}
            </h2>
          </div>
        )}
        
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#1976d2',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              zIndex: 10
            }}
          >
            ×
          </button>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Modal; 