import React, { useState, useEffect } from 'react';
import useBatchTimings from '../hooks/useBatchTimings';
import { BsDownload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { MdAssignment } from 'react-icons/md';
import { RiStickyNoteFill } from 'react-icons/ri';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSectionGA from './RequestTypeSectionGA';
import NoteModal from './NoteModal';
import { ReadOnlyField, CommentTextArea, ActionButton } from './ReusableComponents';
import { useDetailsByMasterID, useUpdateGymDetailsByGA } from '../hooks';

// GA-specific components for Group Exercise
const GAApprovalFormGroupExercise = () => {
  // Example: GA would receive masterid and mempid from the workflow system
  const [masterid, setMasterid] = useState(133);
  const [mempid, setMempid] = useState(25504878);

  // Fetch employee details using getDetailsByMasterID API
  const { data: employeeData, loading: employeeLoading, error: employeeError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid,
    mempid,
    autoFetch: true
  });

  // Fallback employee data (keep header default as requested)
  const [employee] = useState({
    id: '25504878',
    name: 'Manoj Kandan M',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06876669)',
    avatarUrl: '/samsungimage.png'
  });

  const [comment, setComment] = useState('');
  // This would come from the employee's submitted form - for now hardcoded as 'Registration'
  const [requestType, setRequestType] = useState('Registration'); // or 'De-Registration'
  const [showNoteModal, setShowNoteModal] = useState(false);
  // Fetch batch timings for group exercise (gymtype=1, gymid=2, mempid=313)
  const { data: batchTimings, loading: timingsLoading, error: timingsError } = useBatchTimings({
    gymtype: 1,
    gymid: 2,
    mempid: 313,
    autoFetch: true
  });
  
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

  // GA Update API hook
  const { data: updateData, loading: updateLoading, error: updateError, updateGymDetails, clear } = useUpdateGymDetailsByGA();

  const handleApprove = async () => {
    // Prepare request data for approval
    const requestData = {
      masterid: masterid,
      mempid: parseInt(mempid),
      status: 'approved',
      comments: comment
    };

    try {
      const result = await updateGymDetails(requestData);
      if (result && result.success) {
        console.log('Approval successful:', result);
        // Handle success (e.g., show success message, redirect, etc.)
      }
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  const handleReject = async () => {
    // Prepare request data for rejection
    const requestData = {
      masterid: masterid,
      mempid: parseInt(mempid),
      status: 'rejected',
      comments: comment
    };

    try {
      const result = await updateGymDetails(requestData);
      if (result && result.success) {
        console.log('Rejection successful:', result);
        // Handle success (e.g., show success message, redirect, etc.)
      }
    } catch (error) {
      console.error('Rejection failed:', error);
    }
  };

  const handleNoteClick = () => {
    setShowNoteModal(true);
  };

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
      <BreadcrumbHeader title="Gym Registration - GA Approval" />

      {/* Employee Profile Section */}
      <EmployeeProfileSection employee={employee} />

      {/* Required Information Section Header - Outside Grey Background */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/Clip path group.png" width="28" height="28" alt="Required information" style={{ marginRight: 10, verticalAlign: 'middle' }} />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', letterSpacing: 0.1 }}>Required Information</span>
        </div>
      </div>

      {/* Extended Grey Background Container - Request Type to Action Buttons */}
      <div style={{
        background: '#fafbfb',
        borderRadius: 12,
        padding: '32px',
        marginBottom: 32,
        boxShadow: '0 1px 4px #f3f3f3'
      }}>
        {/* Request Type Section Only */}
        <RequestTypeSectionGA requestType={requestType} onNoteClick={handleNoteClick} />

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

        {/* Comment Box */}
        <div style={{ marginBottom: 32 }}>
          <CommentTextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="xxx-xx-xxx-xx-xxx"
            maxLength={500}
            label="Comment (Max 500 Chars)"
          />
        </div>

        {/* GA Update API Status Messages */}
        {updateLoading && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#e3f2fd', 
            color: '#1976d2', 
            borderRadius: '4px', 
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Processing your decision...
          </div>
        )}
        
        {updateError && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            borderRadius: '4px', 
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Error: {updateError}
          </div>
        )}
        
        {updateData && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#e8f5e8', 
            color: '#2e7d32', 
            borderRadius: '4px', 
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            ✅ Decision processed successfully!
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          {updateData && (
            <ActionButton 
              variant="secondary"
              onClick={clear}
            >
              Process Another
            </ActionButton>
          )}
          <ActionButton 
            variant="secondary"
            onClick={handleReject}
            disabled={updateLoading}
          >
            {updateLoading ? 'Processing...' : 'Reject'}
          </ActionButton>
          <ActionButton 
            variant="primary"
            onClick={handleApprove}
            disabled={updateLoading}
          >
            {updateLoading ? 'Processing...' : 'Approve'}
          </ActionButton>
        </div>
      </div>

      {/* Transfer Workflow Section */}
      <div style={{ 
        background: '#eff6ff', 
        borderRadius: 12, 
        padding: '5px', 
        marginBottom: 32,
        border: '1px solid #e9ecef'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BiRefresh size={24} color="#1976d2" />
          <span style={{ fontWeight: 700, fontSize: 16, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Transfer Workflow</span>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            padding: 4, 
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BsChevronRight size={20} color="#000000" />
          </button>
        </div>
      </div>

      {/* Note Modal */}
      <NoteModal 
        isOpen={showNoteModal} 
        onClose={() => setShowNoteModal(false)} 
      />
    </div>
  );
};

export default GAApprovalFormGroupExercise; 