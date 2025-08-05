import React, { useState, useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { MdAssignment } from 'react-icons/md';
import { RiStickyNoteFill } from 'react-icons/ri';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSectionGA from './RequestTypeSectionGA';
import NoteModal from './NoteModal';
import { CommentTextArea, ActionButton, ReadOnlyField, SectionHeader, FileDisplay } from './ReusableComponents';
import { useDetailsByMasterID, useEmployeeRegistrationDetails, useUpdateGymRequestByGA } from '../hooks';


// GA-specific components
const GAApprovalForm = () => {
  // Example: GA would receive masterid and mempid from the workflow system
  // For demonstration, using the values from your screenshots
  const [masterid, setMasterid] = useState(133);
  const [mempid, setMempid] = useState(133);

  // Fetch registration details using the API
  const { data: registrationData, loading: registrationLoading, error: registrationError } = useDetailsByMasterID({
    masterid,
    mempid,
    autoFetch: true
  });

  // Fetch employee profile data using the mempid from registration
  const { data: employeeData, loading: employeeLoading, error: employeeError } = useEmployeeRegistrationDetails({
    mempid: mempid,
    autoFetch: true
  });

  // Fallback employee data if API fails
  const fallbackEmployee = {
    id: '25504878',
    name: 'Manoj Kandan M',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06876669)',
    avatarUrl: '/samsungimage.png'
  };

  // Use API data if available, otherwise fallback
  const employee = employeeData?.success && employeeData?.data ? employeeData.data : fallbackEmployee;

  const [comment, setComment] = useState('');
  // This would come from the employee's submitted form - for now hardcoded as 'Registration'
  const [requestType, setRequestType] = useState('Registration'); // or 'De-Registration'
  const [showNoteModal, setShowNoteModal] = useState(false);

  // GA Update API hook
  const { data: updateData, loading: updateLoading, error: updateError, updateRequest, clear } = useUpdateGymRequestByGA();

  const handleApprove = async () => {
    // Prepare request data for approval
    const requestData = {
      mEmpID: mempid, // Employee ID from registration
      gymID: 1, // Gym ID (should come from registration data)
      regType: 1, // Registration Type (1 for approval)
      paymentOption: 1, // Payment Option
      gymType: 1, // Gym Type
      selectedGymTID: 1, // Selected Gym Timing ID (should come from registration data)
      subscriptionStartDate: new Date().toISOString(), // Start Date (should come from registration data)
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // End Date
      resType: 1, // Response Type (1 for approval)
      fcFileIndexID: 1 // File Index ID (should come from registration data)
    };

    console.log('Approving request with data:', requestData);
    console.log('Comment:', comment);
    
    // Call the API
    await updateRequest(requestData);
  };

  const handleReject = async () => {
    // Prepare request data for rejection
    const requestData = {
      mEmpID: mempid, // Employee ID from registration
      gymID: 1, // Gym ID (should come from registration data)
      regType: 2, // Registration Type (2 for rejection)
      paymentOption: 1, // Payment Option
      gymType: 1, // Gym Type
      selectedGymTID: 1, // Selected Gym Timing ID (should come from registration data)
      subscriptionStartDate: new Date().toISOString(), // Start Date (should come from registration data)
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // End Date
      resType: 2, // Response Type (2 for rejection)
      fcFileIndexID: 1 // File Index ID (should come from registration data)
    };

    console.log('Rejecting request with data:', requestData);
    console.log('Comment:', comment);
    
    // Call the API
    await updateRequest(requestData);
  };

  const handleNoteClick = () => {
    setShowNoteModal(true);
  };

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
      {employeeLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#1976d2' }}>
          Loading employee information...
        </div>
      ) : employeeError ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#f44336' }}>
          <div>Error loading employee data. Using default information.</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>
            Error: {employeeError}
          </div>
        </div>
      ) : (
        <EmployeeProfileSection employee={employee} />
      )}

      {/* Required Information Section Header - Outside Grey Background */}
      <SectionHeader />

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
        
        {/* API Loading/Error Status (subtle) */}
        {registrationLoading && (
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e3f2fd', 
            color: '#1976d2', 
            borderRadius: '4px', 
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Loading registration details...
          </div>
        )}
        {registrationError && (
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            borderRadius: '4px', 
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Error loading details: {registrationError}
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
          <FileDisplay 
            fileName="Fitness Certificate.pdf"
            fileSize="13MB"
            uploadDate="11 Sep, 2023 • 12:24pm"
            onDownload={() => console.log('Download clicked')}
          />
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

export default GAApprovalForm; 