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
import { useEmployeeRegistrationDetails } from '../hooks';

const EmployeeSubmissionForm = () => {
  const [activity, setActivity] = useState('Gym');
  const [modal, setModal] = useState({ open: false, type: '' });
  const [employee, setEmployee] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [formData, setFormData] = useState({});

  // Use the real API hook
  const { data: employeeData, loading: employeeLoading, error: employeeError } = useEmployeeRegistrationDetails({
    mempid: 25504878, // Replace with actual employee ID
    autoFetch: true
  });

  useEffect(() => {
    if (employeeData?.success && employeeData?.data) {
      setEmployee(employeeData.data);
    } else if (employeeError || !employeeData?.success) {
      // Fallback to mock data if API fails
      console.log('Using mock data due to API error:', employeeError);
      setEmployee({
        id: '25504878',
        name: 'Manoj Kandan M',
        email: 'Manoj.kandan@partner.samsung.com',
        designation: 'Outsourcing',
        division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
        manager: 'Ravindra S R (06876669)',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
      });
    }
  }, [employeeData, employeeError]);

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

        {/* Comment Box and Submit Button */}
        <FormActionsSection formData={formData} />
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