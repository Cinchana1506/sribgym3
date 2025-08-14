import React from 'react';
// styles consolidated globally in App

const EmployeeProfileSection = ({ employee }) => {
  return (
    <div className="profile-section">
      {/* Left: Profile Picture + Name + Email */}
      <div className="profile-left">
        <img
          src="/samsungimage.png"
          alt="Profile"
          className="avatar-large"
        />
        <div className="profile-name-email">
          <div className="name">
            {employee?.name || 'Manoj Kandan M'} • Gen ID: {employee?.id || '25504878'}
          </div>
          <div className="email">
            {employee?.email || 'Manoj.kandan@partner.samsung.com'}
          </div>
        </div>
      </div>

      {/* Right: Designation, Division, Manager - Grid Layout */}
      <div className="profile-right">
        <div className="profile-col">
          <div className="label">Designation</div>
          <div className="value">{employee?.designation || 'Outsourcing'}</div>
        </div>
        <div className="profile-col wide">
          <div className="label">Division</div>
          <div className="value">{employee?.division || 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools'}</div>
        </div>
        <div className="profile-col medium">
          <div className="label">Manager</div>
          <div className="value">{employee?.manager || 'Ravindra S R (06876669)'}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileSection; 