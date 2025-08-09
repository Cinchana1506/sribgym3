import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { MdAssignment } from 'react-icons/md';
import { RiStickyNoteFill } from 'react-icons/ri';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import { useDetailsByMasterID, useUpdateGymDetailsByGA } from '../hooks';
import RequestTypeSectionGA from './RequestTypeSectionGA';
import NoteModal from './NoteModal';

// GA-specific components for Group Exercise Deregistration
const GADeregistrationApprovalFormGroupExercise = () => {
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
  // This would come from the employee's submitted form - for now hardcoded as 'De-Registration'
  const [requestType, setRequestType] = useState('De-Registration');
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
      <EmployeeProfileSection employee={employee} />

      {/* Required Information Section Header - Outside Grey Background */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MdAssignment size={28} color="#4caf50" style={{ marginRight: 10, verticalAlign: 'middle' }} />
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
              <label style={{ fontSize: 13, color: '#202224', fontWeight: 700, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif", marginBottom: 4 }}>Gym Activity</label>
              <div style={{
                padding: '12px 16px',
                borderRadius: 5,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                width: '100%',
                height: '44px',
                color: '#202224',
                fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
                background: '#f8f9fa',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center'
              }}>
                Group Exercise
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: 14, color: '#202224', fontWeight: 700, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif", marginBottom: 4 }}>Apply Start Date <span style={{ color: '#f44336' }}>*</span></label>
              <div style={{
                padding: '12px 16px',
                borderRadius: 5,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                width: '100%',
                height: '44px',
                color: '#202224',
                fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
                background: '#f8f9fa',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center'
              }}>
                24-May-2025
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: 14, color: '#202224', fontWeight: 700, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif", marginBottom: 4 }}>Apply End Date <span style={{ color: '#f44336' }}>*</span></label>
              <div style={{
                padding: '12px 16px',
                borderRadius: 5,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                width: '100%',
                height: '44px',
                color: '#202224',
                fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
                background: '#f8f9fa',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center'
              }}>
                12-Jun-2025
              </div>
            </div>
          </div>
        </div>

        {/* Time Slot Section (read-only) */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Time Slot</div>
          <div style={{
            padding: '12px 16px',
            borderRadius: 5,
            border: '1px solid #E5E7EB',
            fontSize: 14,
            width: '40%',
            height: '44px',
            color: '#202224',
            fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
            background: '#f8f9fa',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center'
          }}>
            8:00 AM To 9:00 AM
          </div>
        </div>

        {/* Employee Self Declaration Section (read-only) */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#202224', marginBottom: 16, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Employee Self Declaration</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          <div style={{ fontWeight: 700, fontSize: 14, color: '#202224', marginBottom: 8, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Comment (Max 500 Chars)</div>
          <textarea 
            maxLength={500} 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ 
              width: '100%', 
              minHeight: 80, 
              borderRadius: 6, 
              border: '1px solid #D0D5DD', 
              padding: '12px 16px', 
              fontSize: 14, 
              color: '#202224', 
              fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif", 
              resize: 'vertical', 
              outline: 'none', 
              boxSizing: 'border-box' 
            }} 
            placeholder="xxx-xx-xxx-xx-xxx" 
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <button 
            onClick={handleReject}
            style={{
              padding: '12px 32px',
              background: '#fff',
              color: '#42a5f5',
              border: '2px solid #42a5f5',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
            }}
          >
            Reject
          </button>
          <button 
            onClick={handleApprove}
            style={{
              padding: '12px 32px',
              background: '#42a5f5',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
            }}
          >
            Approve
          </button>
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

export default GADeregistrationApprovalFormGroupExercise; 