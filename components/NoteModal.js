import React from 'react';
import { X, ExternalLink } from 'lucide-react';

const NoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 24,
        width: '500px',
        maxWidth: '40vw',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}>
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#1976d2',
            margin: 0
          }}>
            Note:
          </h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24
            }}>
              <ExternalLink size={16} />
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#1976d2',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                fontSize: 18,
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Policy Content */}
        <div style={{ lineHeight: 1.6 }}>
          <ol style={{
            margin: 0,
            paddingLeft: 20,
            color: '#1a1a1a',
            fontSize: 14
          }}>
            <li style={{ marginBottom: 12 }}>
              Charges as defined /decided for the Fitness centre will be deducted post-paid for the Calendar month irrespective of the actual number of days visited by the user.
            </li>
            <li style={{ marginBottom: 12 }}>
              Fees paid for the particular month will NOT be refunded in-case the person decides to discontinue using the Fitness centre for that month.
            </li>
            <li style={{ marginBottom: 0 }}>
              Fitness center subscription fee cycle will be charged from 1st day of every month till end of same month as per the English calendar. Once it is approved by GA, it will be considered for Payment.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NoteModal; 