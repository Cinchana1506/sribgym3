import React, { useState, useEffect } from 'react';
import BreadcrumbHeader from './BreadcrumbHeader';
import EmployeeProfileSection from './EmployeeProfileSection';
import RequestTypeSection from './RequestTypeSection';
import GymDetails from './GymDetails';
import Declarations from './Declarations';
import FormActionsSection from './FormActionsSection';
import PaymentDetails from './PaymentDetails';
import NoteModal from './NoteModal';

const EmployeeDeregistrationFormGym = () => {
  const [activity, setActivity] = useState('Gym');
  const [employee, setEmployee] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    // Fetch employee data
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('https://api.example.com/employee/25504878');
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.log('Using mock data');
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
    };

    fetchEmployeeData();
  }, []);

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
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
      <EmployeeProfileSection employee={employee} />

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

        {/* Comment Box and Submit Button */}
        <FormActionsSection />
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