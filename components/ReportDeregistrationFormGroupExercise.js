import React, { useState } from 'react';
import { MdAssignment } from 'react-icons/md';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSectionReport from './RequestTypeSectionReport';
import { useDetailsByMasterID } from '../hooks';
// styles consolidated globally in App

// Report components for Group Exercise Deregistration
const ReportDeregistrationFormGroupExercise = () => {
  const [selectedMasterID, setSelectedMasterID] = useState(null);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(25504878); // Default employee ID

  // Fallback employee data
  const [fallbackEmployee] = useState({
    id: '25504878',
    name: 'Manoj Kandan M',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06876669)',
    avatarUrl: '/samsungimage.png'
  });

  // This would come from the employee's submitted form - for now hardcoded as 'De-Registration'
  const [requestType, setRequestType] = useState('De-Registration');

  // Fetch employee details by master ID
  const { data: employeeDetails, loading: employeeLoading, error: employeeError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid: 133, // Default master ID
    mempid: selectedEmployeeID,
    autoFetch: true // Auto-fetch employee details
  });

  // Use employee details from API if available, otherwise use fallback
  const employee = employeeDetails?.success && employeeDetails?.data ? employeeDetails.data : fallbackEmployee;

  return (
    <div className="report-container">
      {/* Breadcrumb and Header */}
      <BreadcrumbHeader title="Gym Registration - Report" />

      {/* Employee Profile Section */}
      <EmployeeProfileSection employee={employee} />

      {/* Required Information Section Header - Outside Grey Background */}
      <div className="section-spacing">
        <div className="section-title-row">
          <img src="/Clip path group.png" width="28" height="28" alt="Required information" className="section-icon" />
          <span className="section-title">Required Information</span>
        </div>
      </div>

      {/* Extended Grey Background Container - Request Type to Employee Self Declaration */}
      <div className="report-card">
        {/* Request Type Section Only */}
        <RequestTypeSectionReport requestType={requestType} />

        {/* Group Exercise Details Section (read-only) */}
        <div className="section-block">
          <div className="row-center-nowrap">
            <span className="label-title">Gym Details</span>
            <span className="label-subtitle">&nbsp;• Maximum Users will be 30 & Minimum of 5 users in each slot per batch for Group Exercises.</span>
          </div>
          <div className="details-row">
            <div className="field">
              <label className="field-label-13">Gym Activity</label>
              <div className="value-box">
                Group Exercise
              </div>
            </div>
            <div className="field">
              <label className="field-label-14">Start Date <span className="asterisk">*</span></label>
              <div className="value-box">
                24-May-2025
              </div>
            </div>
            <div className="field">
              <label className="field-label-14">End Date <span className="asterisk">*</span></label>
              <div className="value-box">
                12-Jun-2025
              </div>
            </div>
          </div>
        </div>

        {/* Time Slot Section (read-only) */}
        <div className="section-block">
          <div className="declaration-title">Time Slot</div>
          <div className="value-box time-slot-box">
            8:00 AM To 9:00 AM
          </div>
        </div>

        {/* Employee Self Declaration Section (read-only) */}
        <div className="section-block">
          <div className="declaration-title">Employee Self Declaration</div>
          <div className="declaration-group">
            <label className="declaration-label">
              <input type="checkbox" checked disabled className="declaration-checkbox" />
              <span>I here by declare to take full responsibility of any incidents caused during workout sessions.</span>
            </label>
            <label className="declaration-label">
              <input type="checkbox" checked disabled className="declaration-checkbox" />
              <span>I here by declare, that i have read the <a href="#" className="declaration-link">Do's and Dont's</a> on using the SRI-B Gymnasium.</span>
            </label>
            <label className="declaration-label">
              <input type="checkbox" checked disabled className="declaration-checkbox" />
              <span>I here by declare, that i have read the <a href="#" className="declaration-link">OS Employees payment guidelines</a>.</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDeregistrationFormGroupExercise; 