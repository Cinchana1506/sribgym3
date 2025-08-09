import React, { useState } from 'react';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSection from './RequestTypeSection';
import GymDetails from './GymDetails';
import Declarations from './Declarations';
import FormActionsSection from './FormActionsSection';
import PaymentDetails from './PaymentDetails';
import NoteModal from './NoteModal';
import { useDetailsByMasterID, useUpdateGymRequestByEmployee } from '../hooks';

const EmployeeDeregistrationFormGym = () => {
  const [activity, setActivity] = useState('Gym');
  const [attachedFile, setAttachedFile] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [formData, setFormData] = useState({});

  // Employee ID and Master ID - in real app this would come from authentication/workflow
  const employeeId = 25504878;
  const [masterid, setMasterid] = useState(133);

  // Fetch employee details using getDetailsByMasterID API
  const { data: employeeData, loading: employeeLoading, error: employeeError, fetchDetailsByMasterID } = useDetailsByMasterID({
    masterid,
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

  // Employee Update API hook for deregistration
  const { data: updateData, loading: updateLoading, error: updateError, updateRequest, clear } = useUpdateGymRequestByEmployee();

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };

  const handleNoteClick = () => {
    setShowNoteModal(true);
  };

  const handleUpdateDeregistration = async () => {
    // Prepare request data for updating deregistration
    const requestData = {
      mEmpID: employeeId, // Employee ID
      gymID: 1, // Gym ID (should come from form data)
      regType: 2, // Registration Type (2 for deregistration)
      paymentOption: 1, // Payment Option (should come from form data)
      gymType: 1, // Gym Type (should come from form data)
      selectedGymTID: 1, // Selected Gym Timing ID (should come from form data)
      subscriptionStartDate: new Date().toISOString(), // Start Date (should come from form data)
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // End Date (should come from form data)
      resType: 2, // Response Type (2 for deregistration)
      fcFileIndexID: 1 // File Index ID (should come from form data)
    };

    console.log('Updating deregistration with data:', requestData);
    
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

      {/* Required Information and Request Type Section */}
      <RequestTypeSection onPaymentClick={handlePaymentClick} onNoteClick={handleNoteClick} defaultRequestType="De-Registration" currentActivity={activity} />

      {/* Main Form Container - Everything from Request Type to Submit Button */}
      <div style={{
        background: '#fafbfb',
        borderRadius: 12,
        padding: '32px',
        marginBottom: 32,
        boxShadow: '0 1px 4px #f3f3f3'
      }}>
        {/* Form Fields: Gym Details */}
        <div style={{ marginBottom: 32 }}>
          <GymDetails state="deregistration" onActivityChange={setActivity} />
        </div>

        {/* Declarations */}
        <div style={{ marginBottom: 32 }}>
          <Declarations state="deregistration" />
        </div>

        {/* Comment Box and Submit/Update Button */}
        <FormActionsSection 
          formData={formData} 
          isUpdateMode={true} // Always update mode for deregistration
          onUpdate={handleUpdateDeregistration}
        />
      </div>

      {/* Payment Details Modal */}
      <PaymentDetails 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
      />

      {/* Note Modal */}
      <NoteModal 
        isOpen={showNoteModal} 
        onClose={() => setShowNoteModal(false)} 
      />
    </div>
  );
};

export default EmployeeDeregistrationFormGym; 