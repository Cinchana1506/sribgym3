import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { MdAssignment } from 'react-icons/md';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSectionReport from './RequestTypeSectionReport';
import { ReadOnlyField } from './ReusableComponents';
import { useDetailsByMasterID } from '../hooks';
// styles consolidated globally in App

// Report-specific components for Gym
const ReportFormGym = () => {
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

  // This would come from the employee's submitted form - for now hardcoded as 'Registration'
  const [requestType, setRequestType] = useState('Registration'); // or 'De-Registration'

  // Fetch employee details by master ID - ONLY API used for this report
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



        {/* Employee Registration Details - Using getDetailsByMasterID API only */}
        {employeeDetails && employeeDetails.success && (
          <div className="section-block">
            <div className="declaration-title">
              Employee Registration Details
            </div>
            <div className="white-card">
              <div className="grid-2">
                <ReadOnlyField label="Employee ID" value={employee.id || '25504878'} />
                <ReadOnlyField label="Employee Name" value={employee.name || 'Manoj Kandan M'} />
                <ReadOnlyField label="Activity Type" value="Gym" />
                <ReadOnlyField label="Registration Status" value="Active" />
                <ReadOnlyField label="Start Date" value="24-May-2025" />
                <ReadOnlyField label="End Date" value="12-Jun-2025" />
              </div>
            </div>
          </div>
        )}

        {/* Gym Details Section (read-only) */}
        <div className="section-block">
          <div className="row-center-nowrap">
            <span className="label-title">Gym Details</span>
            <span className="label-subtitle">&nbsp;• Maximum User will be 70 per batch for Gym</span>
          </div>
          <div className="details-row">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Gym Activity"
                value="Gym"
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Start Date"
                value="24-May-2025"
                required={true}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="End Date"
                value="12-Jun-2025"
                required={true}
              />
            </div>
          </div>
        </div>

        {/* Fitness Certificate Section (read-only) */}
        <div className="section-block">
          <div className="declaration-title">Fitness Certificate</div>
          <div className="fitness-file-card">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="file-icon">
              <rect width="24" height="24" rx="4" fill="#F44336"/>
              <text x="50%" y="60%" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">PDF</text>
            </svg>
            <span className="file-name">Fitness Certificate.pdf</span>
            <span className="file-meta">11 Sep, 2023 • 12:24pm • 13MB</span>
            <span className="download-icon"><BsDownload size={50} color="#f44336" /></span>
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

export default ReportFormGym; 