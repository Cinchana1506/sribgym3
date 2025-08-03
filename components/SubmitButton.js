import React from 'react';
import { ActionButton } from './ReusableComponents';

const SubmitButton = ({ state, onSubmit }) => {
  if (state === 'state3') return null;
  
  if (state === 'state1') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '32px 0 0 0' }}>
        <ActionButton 
          variant="primary"
          onClick={onSubmit}
          style={{
            padding: '10px 32px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #e3e8ee',
          }}
        >
          Submit
        </ActionButton>
      </div>
    );
  }
  
  // state2
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, margin: '32px 0 0 0' }}>
      <ActionButton
        variant="secondary"
        onClick={onSubmit}
        style={{
          padding: '10px 32px',
          background: '#fff',
          color: '#1976d2',
          border: '2px solid #bdbdbd',
          borderRadius: 6,
          fontWeight: 500,
          fontSize: 16,
          marginRight: 8,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        Reject
      </ActionButton>
      <ActionButton
        variant="primary"
        onClick={onSubmit}
        style={{
          padding: '10px 32px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #e3e8ee',
        }}
      >
        Approve
      </ActionButton>
    </div>
  );
};

export default SubmitButton; 