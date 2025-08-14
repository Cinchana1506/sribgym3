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
import { useDetailsByMasterID, useUpdateGymDetailsByGA } from '../hooks';


// GA-specific components
const GAApprovalForm = () => {
  // Example: GA would receive masterid and mempid from the workflow system
  // For demonstration, using the values from your screenshots
  const [masterid, setMasterid] = useState(133);
  const [mempid, setMempid] = useState(133);

  // Fetch employee details using getDetailsByMasterID API
  const { data: employeeData, loading: employeeLoading, error: employeeError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid,
    mempid,
    autoFetch: true
  });

  // Fallback employee data (keep header default as requested)
  const fallbackEmployee = {
    id: '25504878',
    name: 'Manoj Kandan M',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06876669)',
    avatarUrl: '/samsungimage.png'
  };

  // Always use fallback for header as requested, but API data available for other uses
  const employee = fallbackEmployee;

  const [comment, setComment] = useState('');
  // This would come from the employee's submitted form - for now hardcoded as 'Registration'
  const [requestType, setRequestType] = useState('Registration'); // or 'De-Registration'
  const [showNoteModal, setShowNoteModal] = useState(false);

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
    console.log('Rejecting request with data:', requestData);
    console.log('Comment:', comment);
  };

  const handleNoteClick = () => {
    setShowNoteModal(true);
  };

  return (
    <div className="report-container">
      {/* Breadcrumb and Header */}
      <BreadcrumbHeader title="Gym Registration - GA Approval" />

      {/* Employee Profile Section */}
      {employeeLoading ? (
        <div className="info-text-centered">Loading employee information...</div>
      ) : employeeError ? (
        <div className="error-text-centered">
          <div>Error loading employee data. Using default information.</div>
          <div className="fs-12 mt-8">Error: {employeeError}</div>
        </div>
      ) : (
        <EmployeeProfileSection employee={employee} />
      )}

      {/* Required Information Section Header - Outside Grey Background */}
      <SectionHeader />

      {/* Extended Grey Background Container - Request Type to Action Buttons */}
      <div className="report-card">
        {/* Request Type Section Only */}
        <RequestTypeSectionGA requestType={requestType} onNoteClick={handleNoteClick} />
        
        {/* API Loading/Error Status (subtle) */}
        {employeeLoading && (<div className="alert info">Loading employee details...</div>)}
        {employeeError && (<div className="alert error">Error loading details: {employeeError}</div>)}
        {/* Gym Details Section (read-only) */}
        <div className="section-block">
          <div className="flex-row items-center gap-8 mb-2 nowrap">
            <span style={{ fontWeight: 700, fontSize: 16, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Gym Details</span>
            <span style={{ color: '#98A2B3', fontWeight: 400, fontSize: 15, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>&nbsp;• Maximum User will be 70 per batch for Gym</span>
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
        {updateLoading && (<div className="alert info">Processing your decision...</div>)}
        
        {updateError && (<div className="alert error">Error: {updateError}</div>)}
        
        {updateData && (<div className="alert success">✅ Decision processed successfully!</div>)}

        {/* Action Buttons */}
        <div className="flex justify-end gap-16">
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
      <div className="transfer-banner">
        <div className="transfer-row">
          <BiRefresh size={24} color="#1976d2" />
          <span style={{ fontWeight: 700, fontSize: 16, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Transfer Workflow</span>
          <button className="btn-icon-plain">
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