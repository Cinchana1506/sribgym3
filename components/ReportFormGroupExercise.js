import React, { useState, useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { MdAssignment } from 'react-icons/md';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSectionReport from './RequestTypeSectionReport';
import { ReadOnlyField } from './ReusableComponents';
import useBatchTimings from '../hooks/useBatchTimings';
import useGymWorkflowStatus from '../hooks/useGymWorkflowStatus';
import useDetailsByMasterID from '../hooks/useDetailsByMasterID';
import usePaymentStatus from '../hooks/usePaymentStatus';

// Report-specific components for Group Exercise
const ReportFormGroupExercise = () => {
  const [employee] = useState({
    id: '25504878',
    name: 'Manoj Kandan M',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06876669)',
    avatarUrl: '/samsungimage.png'
  });

  // State for request type - will be determined based on registration status
  const [requestType, setRequestType] = useState('Registration'); // or 'De-Registration'
  const [hasExistingRegistration, setHasExistingRegistration] = useState(false);
  const [masterID, setMasterID] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);

  // Get employee ID (default to 313 if not available from login)
  const employeeId = employee.id || '313';

  // Fetch batch timings for group exercise (gymtype=1, gymid=2, mempid=313)
  const { data: batchTimings, loading: timingsLoading, error: timingsError } = useBatchTimings({
    gymtype: 1,
    gymid: 2,
    mempid: parseInt(employeeId),
    autoFetch: true
  });

  // Fetch workflow status for the employee
  const { data: workflowStatus, loading: workflowLoading, error: workflowError } = useGymWorkflowStatus({
    mempid: parseInt(employeeId),
    autoFetch: true
  });

  // Fetch details by master ID if we have a master ID
  const { data: registrationDetails, loading: detailsLoading, error: detailsError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid: masterID,
    mempid: parseInt(employeeId),
    autoFetch: false // We'll fetch manually when we have master ID
  });

  // Effect to determine registration status and set appropriate form mode
  useEffect(() => {
    if (workflowStatus && workflowStatus.masterID) {
      setMasterID(workflowStatus.masterID);
      // If employee has a master ID, they have registered
      setHasExistingRegistration(true);
      // Default to deregistration if they have existing registration
      setRequestType('De-Registration');
    } else if (registrationDetails) {
      // Check if registration details indicate existing registration
      const isRegistered = registrationDetails.gymwfs !== undefined && registrationDetails.gymwfs !== null;
      setHasExistingRegistration(isRegistered);
      if (isRegistered) {
        setRequestType('De-Registration');
      }
    }
  }, [workflowStatus, registrationDetails]);

  // Fetch registration details when master ID is available
  useEffect(() => {
    if (masterID && parseInt(employeeId)) {
      fetchDetailsByMasterID({ masterid: masterID, mempid: parseInt(employeeId) });
    }
  }, [masterID, employeeId, fetchDetailsByMasterID]);

  // Function to toggle between registration and deregistration
  const toggleRequestType = () => {
    setRequestType(prev => prev === 'Registration' ? 'De-Registration' : 'Registration');
  };

  // Function to get approval status from gymwfs field
  const getApprovalStatus = () => {
    if (registrationDetails && registrationDetails.gymwfs !== undefined) {
      return registrationDetails.gymwfs === 0 ? 'Pending' : 'Approved';
    }
    return 'Unknown';
  };

  // Payment status hook - fetch when payment button is clicked
  const { data: paymentStatus, loading: paymentLoading, error: paymentError, fetchPaymentStatus } = usePaymentStatus({
    mempid: parseInt(employeeId),
    year: '2025',
    startmonth: '8', // Current month
    endmonth: '8',   // Current month
    autoFetch: false // Only fetch when payment button is clicked
  });

  // Function to handle payment button click
  const handlePaymentClick = () => {
    setShowPayment(true);
    setPaymentChecked(true);
    // Fetch payment status
    fetchPaymentStatus({
      mempid: parseInt(employeeId),
      year: '2025',
      startmonth: '8',
      endmonth: '8'
    });
  };

  // Function to check if payment is already made
  const isPaymentMade = () => {
    if (paymentStatus && paymentStatus.data && paymentStatus.data.length > 0) {
      // Check if payment status indicates payment is made
      return paymentStatus.data.some(payment => payment.paymentStatus === 'Paid' || payment.status === true);
    }
    return false;
  };

  // Function to check if submit button should be disabled
  const isSubmitDisabled = () => {
    return paymentChecked && isPaymentMade();
  };

  // Get the first available time slot or use default
  const getSelectedTimeSlot = () => {
    if (batchTimings && batchTimings.length > 0) {
      // Assuming the API returns an array of time slots with a format like { timeSlot: "8.00 AM to 9.00 AM" }
      // Adjust this based on the actual API response structure
      return batchTimings[0].timeSlot || batchTimings[0].timings || batchTimings[0].slot || '8.00 AM to 9.00 AM';
    }
    return '8.00 AM to 9.00 AM'; // fallback
  };

  const selectedTimeSlot = getSelectedTimeSlot();

  // Group Exercise specific data
  const activitySchedule = [
    { day: 'Monday', activity: 'Yoga', color: '#E3F2FD' },
    { day: 'Tuesday', activity: 'Aerobics', color: '#F3E5F5' },
    { day: 'Wednesday', activity: 'Yoga', color: '#E8F5E8' },
    { day: 'Thursday', activity: 'Aerobics', color: '#FFF8E1' },
    { day: 'Friday', activity: 'Zumba', color: '#FCE4EC' }
  ];

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

      {/* Workflow Status Display */}
      {workflowStatus && (
        <div style={{
          background: workflowStatus.status === 'Approved' || workflowStatus.isApproved ? '#e8f5e8' : '#fff3e0',
          border: `1px solid ${workflowStatus.status === 'Approved' || workflowStatus.isApproved ? '#4caf50' : '#ff9800'}`,
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: workflowStatus.status === 'Approved' || workflowStatus.isApproved ? '#4caf50' : '#ff9800'
          }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#202224', marginBottom: 4 }}>
              Workflow Status: {workflowStatus.status || (workflowStatus.isApproved ? 'Approved' : 'Pending')}
            </div>
            <div style={{ fontSize: 14, color: '#666' }}>
              {workflowStatus.status === 'Approved' || workflowStatus.isApproved 
                ? 'Your gym registration request has been approved.' 
                : 'Your gym registration request is pending approval.'}
            </div>
          </div>
        </div>
      )}
      {workflowLoading && (
        <div style={{
          background: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 24,
          textAlign: 'center',
          color: '#666'
        }}>
          Loading workflow status...
        </div>
      )}
      {workflowError && (
        <div style={{
          background: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 24,
          color: '#d32f2f'
        }}>
          Error loading workflow status: {workflowError}
        </div>
      )}

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

        {/* Group Exercise Details Section (read-only) */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2, whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Gym Details</span>
            <span style={{ color: '#98A2B3', fontWeight: 400, fontSize: 15, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>&nbsp;• Maximum Users will be 30 & Minimum of 5 users in each slot per batch for Group Exercises.</span>
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', marginBottom: 0, marginTop: 16 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Gym Activity"
                value="Group Exercise"
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

          {/* Activity Details Section */}
          <div style={{ marginTop: 32, marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Activity Details</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginRight: 80 }}>
              {activitySchedule.map(({ day, activity, color }) => (
                <div key={day} style={{
                  background: color,
                  padding: 12,
                  borderRadius: 6,
                  minWidth: 50,
                  textAlign: 'left',
                  flex: 1,
                  marginRight: 4
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#202224', marginBottom: 4 }}>{day}</div>
                  <div style={{ fontSize: 14, color: '#202224' }}>{activity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Select Time Slots Section (read-only) */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Select Time Slots</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '12px 24px',
                  background: '#E3F2FD',
                  color: '#1976d2',
                  border: '2px solid #1976d2',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'default',
                  fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
                  pointerEvents: 'none'
                }}
              >
                {selectedTimeSlot}
              </button>
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

export default ReportFormGroupExercise; 