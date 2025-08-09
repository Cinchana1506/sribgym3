import React, { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { MdAssignment } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import { RiStickyNoteFill } from 'react-icons/ri';
import { BsClock } from 'react-icons/bs';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSection from './RequestTypeSection';
import GymDetails from './GymDetails';
import Declarations from './Declarations';
import FormActionsSection from './FormActionsSection';
import PaymentDetails from './PaymentDetails';
import NoteModal from './NoteModal';
import { Modal, FormContainer } from './ReusableComponents';
import { useGymWorkflowStatus, useEmployeeRegistrationDetails, useUpdateGymRequestByEmployee } from '../hooks';

const EmployeeSubmissionForm = () => {
  const [activity, setActivity] = useState('Gym');
  const [modal, setModal] = useState({ open: false, type: '' });
  const [attachedFile, setAttachedFile] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [formData, setFormData] = useState({});

  // Employee ID - in real app this would come from authentication
  const employeeId = 25504878;

  // Fetch employee profile data using the API
  const { data: employeeData, loading: employeeLoading, error: employeeError } = useEmployeeRegistrationDetails({
    mempid: employeeId,
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
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  // Use API data if available, otherwise fallback
  const employee = employeeData?.success && employeeData?.data ? employeeData.data : fallbackEmployee;

  // Check workflow status for this employee using the provided API
  const { data: workflowData, loading: workflowLoading, error: workflowError } = useGymWorkflowStatus({
    mempid: 25504878, // Replace with actual employee ID
    autoFetch: true
  });

  // Employee Update API hook
  const { data: updateData, loading: updateLoading, error: updateError, updateRequest, clear } = useUpdateGymRequestByEmployee();

  const handleApprove = () => {
    setModal({ open: true, type: 'approval' });
  };

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (paymentData) => {
    // This would integrate with your payment API
    console.log('Payment data:', paymentData);
    setShowPaymentModal(false);
  };

  const handleNoteClick = () => {
    setShowNoteModal(true);
  };

  const handleUpdateRequest = async () => {
    // Prepare request data for updating existing registration
    const requestData = {
      mEmpID: employeeId, // Employee ID
      gymID: 1, // Gym ID (should come from form data)
      regType: 1, // Registration Type (1 for update)
      paymentOption: 1, // Payment Option (should come from form data)
      gymType: 1, // Gym Type (should come from form data)
      selectedGymTID: 1, // Selected Gym Timing ID (should come from form data)
      subscriptionStartDate: new Date().toISOString(), // Start Date (should come from form data)
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // End Date (should come from form data)
      resType: 1, // Response Type (1 for update)
      fcFileIndexID: 1 // File Index ID (should come from form data)
    };

    console.log('Updating registration with data:', requestData);
    
    // Call the API
    await updateRequest(requestData);
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
      <BreadcrumbHeader title="Gym Registration - Employee Initiation" />

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

      {/* Workflow Status Section */}
      {workflowLoading ? (
        <div style={{ padding: '10px', textAlign: 'center', color: '#1976d2', fontSize: '14px' }}>
          Checking workflow status...
        </div>
      ) : workflowError ? (
        <div style={{ padding: '10px', textAlign: 'center', color: '#f44336', fontSize: '14px' }}>
          Error checking workflow status: {workflowError}
        </div>
      ) : workflowData && workflowData.data && workflowData.data.length > 0 ? (
        <div style={{ 
          padding: '15px', 
          margin: '10px 0', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#856404' }}>
            ⚠️ Workflow Status
          </div>
          {workflowData.data.map((workflow, index) => (
            <div key={index} style={{ color: '#856404' }}>
              <div>Pending Workflow ID: {workflow.pendingWFID}</div>
              <div>Status: {workflow.status === 0 ? 'Pending' : 'Active'}</div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Required Information and Request Type Section */}
      <RequestTypeSection onPaymentClick={handlePaymentClick} onNoteClick={handleNoteClick} currentActivity={activity} />

      {/* Main Form Container - Everything from Request Type to Submit Button */}
      <FormContainer>
        {/* Form Fields: Gym Details */}
        <div style={{ marginBottom: 32 }}>
          <GymDetails state="state1" onActivityChange={setActivity} />
        </div>

        {/* Declarations */}
        <div style={{ marginBottom: 32 }}>
          <Declarations state="state1" />
        </div>

        {/* Comment Box and Submit/Update Button */}
        <FormActionsSection 
          formData={formData} 
          isUpdateMode={workflowData && workflowData.data && workflowData.data.length > 0} // If workflow exists, enable update mode
          onUpdate={handleUpdateRequest}
        />
      </FormContainer>

      {/* Modal overlays */}
      <Modal open={modal.open && modal.type === 'approval'} onClose={() => setModal({ open: false, type: '' })}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px', color: '#333' }}>Approval Confirmation</h2>
          <p style={{ marginBottom: '24px', color: '#666' }}>Your request has been submitted successfully!</p>
          <button
            onClick={() => setModal({ open: false, type: '' })}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Payment Details Modal */}
      <PaymentDetails 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        employeeId={employeeId}
      />

      {/* Note Modal */}
      <NoteModal 
        isOpen={showNoteModal} 
        onClose={() => setShowNoteModal(false)} 
      />
    </div>
  );
};

export default EmployeeSubmissionForm; 