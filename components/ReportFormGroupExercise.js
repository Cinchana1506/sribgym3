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
import useDetailsByMasterID from '../hooks/useDetailsByMasterID';
import usePaymentStatus from '../hooks/usePaymentStatus';
// styles consolidated globally in App

// Report-specific components for Group Exercise
const ReportFormGroupExercise = () => {
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

  // State for request type - will be determined based on registration status
  const [requestType, setRequestType] = useState('Registration'); // or 'De-Registration'
  const [hasExistingRegistration, setHasExistingRegistration] = useState(false);
  const [masterID, setMasterID] = useState(133); // Default master ID
  const [showPayment, setShowPayment] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);

  // Get employee ID (default to 25504878 if not available from login)
  const employeeId = fallbackEmployee.id || '25504878';

  // Fetch batch timings for group exercise (gymtype=1, gymid=2, mempid=25504878)
  const { data: batchTimings, loading: timingsLoading, error: timingsError } = useBatchTimings({
    gymtype: 1,
    gymid: 2,
    mempid: parseInt(employeeId),
    autoFetch: true
  });

  // Fetch details by master ID
  const { data: registrationDetails, loading: detailsLoading, error: detailsError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid: masterID,
    mempid: parseInt(employeeId),
    autoFetch: true // Auto-fetch employee details
  });

  // Use employee details from API if available, otherwise use fallback
  const employee = registrationDetails?.success && registrationDetails?.data ? registrationDetails.data : fallbackEmployee;

  // Effect to determine registration status and set appropriate form mode
  useEffect(() => {
    if (registrationDetails && registrationDetails.success) {
      // Check if registration details indicate existing registration
      setHasExistingRegistration(true);
      setRequestType('De-Registration');
    }
  }, [registrationDetails]);

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
    <div className="report-container">
      {/* Breadcrumb and Header */}
      <BreadcrumbHeader title="Gym Registration - Report" />

      {/* Workflow Status Display - Using registration details */}
      {registrationDetails && registrationDetails.success && (
        <div className="status-banner registered">
          <div className="status-dot" />
          <div className="status-text">
            <div className="title">Workflow Status: Registered</div>
            <div className="desc">Employee registration details found.</div>
          </div>
        </div>
      )}
      {detailsLoading && (
        <div className="status-banner loading">Loading employee details...</div>
      )}
      {detailsError && (
        <div className="status-banner error">Error loading employee details: {detailsError}</div>
      )}

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
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ReadOnlyField
                label="Gym Activity"
                value="Group Exercise"
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

          {/* Activity Details Section */}
          <div className="section-block mt-32">
            <div className="activity-section-title">Activity Details</div>
            <div className="activity-cards">
              {activitySchedule.map(({ day, activity, color }) => (
                <div key={day} className={`activity-card bg-${color.replace('#','')}`}>
                  <div className="day">{day}</div>
                  <div className="activity">{activity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Select Time Slots Section (read-only) */}
          <div className="section-block">
            <div className="time-slot-label">Select Time Slots</div>
            <div className="chip-list">
              <button className="time-slot-chip">
                {selectedTimeSlot}
              </button>
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

export default ReportFormGroupExercise; 