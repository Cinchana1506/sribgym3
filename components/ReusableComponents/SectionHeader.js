import React from 'react';
import { MdAssignment } from 'react-icons/md';

const SectionHeader = ({ 
  icon = <img src="/Clip path group.png" width="28" height="28" alt="Required information" style={{ marginRight: 10, verticalAlign: 'middle' }} />,
  title = "Required Information",
  subtitle,
  style = {}
}) => {
  return (
    <div style={{ marginBottom: 24, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {icon}
        <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', letterSpacing: 0.1 }}>
          {title}
        </span>
        {subtitle && (
          <span style={{ color: '#666', fontSize: 16, fontWeight: 400 }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default SectionHeader; 