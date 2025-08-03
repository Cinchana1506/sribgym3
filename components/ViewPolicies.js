import React from 'react';

const viewPoliciesIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, verticalAlign: 'middle' }}>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="#606060" strokeWidth="2" fill="none" />
    <line x1="8" y1="6" x2="16" y2="6" stroke="#606060" strokeWidth="2" />
    <line x1="8" y1="10" x2="16" y2="10" stroke="#606060" strokeWidth="2" />
    <line x1="8" y1="14" x2="12" y2="14" stroke="#606060" strokeWidth="2" />
  </svg>
);

const ViewPolicies = () => (
  <a href="#" style={{
    display: 'flex',
    alignItems: 'center',
    color: '#606060',
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
    fontWeight: 400,
    fontSize: 14,
    textDecoration: 'none',
    margin: '32px 0 0 0',
  }}>{viewPoliciesIcon}View Policies</a>
);

export default ViewPolicies; 
