import React from 'react';

const EmployeeProfileSection = ({ employee }) => {
  return (
    <div style={{
      background: 'transparent',
      borderRadius: 12,
      padding: '24px',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 24
    }}>
      {/* Left: Profile Picture + Name + Email */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexShrink: 0 }}>
        <img
          src="/samsungimage.png"
          alt="Profile"
          style={{
            borderRadius: '50%',
            width: 64,
            height: 64,
            border: '3px solid #E5E7EB',
            objectFit: 'cover',
            marginTop: '-12px'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
            {employee?.name || 'Manoj Kandan M'} • Gen ID: {employee?.id || '25504878'}
          </div>
          <div style={{ fontSize: 14, color: '#6B7280', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
            {employee?.email || 'Manoj.kandan@partner.samsung.com'}
          </div>
        </div>
      </div>

      {/* Right: Designation, Division, Manager - Grid Layout */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 'auto'
      }}>
        <div style={{
          borderLeft: '1px solid #DFE5EF',
          paddingLeft: 24,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <div style={{ color: '#6B7280', fontSize: 12, marginBottom: 4, fontWeight: 400, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Designation</div>
          <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 14, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>{employee?.designation || 'Outsourcing'}</div>
        </div>
        <div style={{
          borderLeft: '1px solid #DFE5EF',
          paddingLeft: 30,
          flex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <div style={{ color: '#6B7280', fontSize: 12, marginBottom: 4, fontWeight: 400, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Division</div>
          <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 14, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>{employee?.division || 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools'}</div>
        </div>
        <div style={{
          borderLeft: '1px solid #DFE5EF',
          paddingLeft: 30,
          flex: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <div style={{ color: '#6B7280', fontSize: 12, marginBottom: 4, fontWeight: 400, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Manager</div>
          <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 14, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>{employee?.manager || 'Ravindra S R (06876669)'}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileSection; 