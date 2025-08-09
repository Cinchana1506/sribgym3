import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { MdAssignment } from 'react-icons/md';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSectionReport from './RequestTypeSectionReport';
import { ReadOnlyField } from './ReusableComponents';
import { useGymRegistrationDetails, useDetailsByMasterID } from '../hooks';

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

  // Fetch employee details by master ID
  const { data: employeeDetails, loading: employeeLoading, error: employeeError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid: selectedMasterID,
    mempid: selectedEmployeeID,
    autoFetch: false // Don't auto-fetch, let user trigger
  });

  // Fetch gym registration details for reporting
  const { data: registrationDetails, loading: detailsLoading, error: detailsError, fetchGymRegistrationDetails } = useGymRegistrationDetails({
    searchtype: 1, // Search type (1 for gym)
    isemphistory: 0, // Not employee history
    empname: '', // Empty for all employees
    autoFetch: false // Don't auto-fetch, let user trigger
  });

  // Use employee details from API if available, otherwise use fallback
  const employee = employeeDetails?.success && employeeDetails?.data ? employeeDetails.data : fallbackEmployee;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 0,
      boxShadow: 'none',
      padding: '0 24px',
      margin: 0,
      width: '100vw',
      maxWidth: '100vw',
      minWidth: 0,
      position: 'relative',
      overflowX: 'visible',
      boxSizing: 'border-box',
    }}>
      {/* Breadcrumb and Header */}
      <BreadcrumbHeader title="Gym Registration - Report" />

      {/* Employee Profile Section */}
      <EmployeeProfileSection employee={employee} />

      {/* Required Information Section Header - Outside Grey Background */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MdAssignment size={28} color="#4caf50" style={{ marginRight: 10, verticalAlign: 'middle' }} />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', letterSpacing: 0.1 }}>Required Information</span>
        </div>
      </div>

      {/* Extended Grey Background Container - Request Type to Employee Self Declaration */}
      <div style={{
        background: '#fafbfb',
        borderRadius: 12,
        padding: '32px',
        marginBottom: 32,
        boxShadow: '0 1px 4px #f3f3f3'
      }}>
        {/* Request Type Section Only */}
        <RequestTypeSectionReport requestType={requestType} />



        {/* Results Display */}
        {registrationDetails && registrationDetails.success && registrationDetails.data && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
              Registration Details
            </div>
            <div style={{ 
              background: '#fff', 
              border: '1px solid #e3e8ee', 
              borderRadius: 8,
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e3e8ee', fontSize: 14, fontWeight: 600 }}>Employee ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e3e8ee', fontSize: 14, fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e3e8ee', fontSize: 14, fontWeight: 600 }}>Gym Type</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e3e8ee', fontSize: 14, fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e3e8ee', fontSize: 14, fontWeight: 600 }}>Start Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e3e8ee', fontSize: 14, fontWeight: 600 }}>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrationDetails.data.map((record, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px', fontSize: 14 }}>{record.employeeID || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: 14 }}>{record.employeeName || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: 14 }}>{record.gymType || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: 14 }}>{record.status || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: 14 }}>{record.startDate || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: 14 }}>{record.endDate || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gym Details Section (read-only) */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2, whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Gym Details</span>
            <span style={{ color: '#98A2B3', fontWeight: 400, fontSize: 15, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>&nbsp;• Maximum User will be 70 per batch for Gym</span>
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', marginBottom: 0, marginTop: 16 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Gym Activity"
                value="Gym"
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Apply Start Date"
                value="24-May-2025"
                required={true}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Apply End Date"
                value="12-Jun-2025"
                required={true}
              />
            </div>
          </div>
        </div>

        {/* Fitness Certificate Section (read-only) */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Fitness Certificate</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            border: '1.5px solid #e3e8ee',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: 15,
            minWidth: 220,
            maxWidth: 340,
            boxShadow: '0 1px 2px #f0f0f0',
            gap: 8,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
              <rect width="24" height="24" rx="4" fill="#F44336"/>
              <text x="50%" y="60%" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">PDF</text>
            </svg>
            <span style={{ fontWeight: 500, marginRight: 8 }}>Fitness Certificate.pdf</span>
            <span style={{ color: '#888', fontSize: 12, marginRight: 8 }}>11 Sep, 2023 • 12:24pm • 13MB</span>
            <BsDownload size={50} color="#f44336" style={{ cursor: 'pointer', strokeWidth: 0.5 }} />
          </div>
        </div>

        {/* Employee Self Declaration Section (read-only) */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Employee Self Declaration</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', fontSize: 14, color: '#202224', cursor: 'default' }}>
              <input type="checkbox" checked disabled style={{ marginRight: 12, marginTop: 2 }} />
              <span>I here by declare to take full responsibility of any incidents caused during workout sessions.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', fontSize: 14, color: '#202224', cursor: 'default' }}>
              <input type="checkbox" checked disabled style={{ marginRight: 12, marginTop: 2 }} />
              <span>I here by declare, that i have read the <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>Do's and Dont's</a> on using the SRI-B Gymnasium.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', fontSize: 14, color: '#202224', cursor: 'default' }}>
              <input type="checkbox" checked disabled style={{ marginRight: 12, marginTop: 2 }} />
              <span>I here by declare, that i have read the <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>OS Employees payment guidelines</a>.</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFormGym; 