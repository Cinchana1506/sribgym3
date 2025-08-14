import React from 'react';
import { MdAssignment } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import { RiStickyNoteFill } from 'react-icons/ri';

const RequestTypeSectionGA = ({ requestType, onNoteClick }) => {
  return (
    <>
      {/* Request Type + Note Button Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
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

        {/* Right: Note Button Only */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={onNoteClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#8B5CF6',
              fontWeight: 600,
              fontSize: 15,
              padding: '8px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              borderRadius: 6,
              transition: 'background-color 0.2s'
            }}
            aria-label="Note"
            title="Note"
          >
            <img src="/Notet.png" className="note-icon" alt="Note" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestTypeSectionGA; 