import React, { useState } from 'react';
import { CommentTextArea, ActionButton } from './ReusableComponents';
import { useSubmitGymRequest } from '../hooks';

const FormActionsSection = ({ formData }) => {
  const [comment, setComment] = useState('');
  const { data, loading, error, submitRequest, clear } = useSubmitGymRequest();

  const handleSubmit = async () => {
    // For now, let's use sample data to test the API
    // In a real app, you would collect this from form fields
    const requestData = {
      mEmpID: 25504878, // Employee ID
      gymID: 1, // Gym ID
      regType: 1, // Registration Type
      paymentOption: 1, // Payment Option
      gymType: 1, // Gym Type
      selectedGymTID: 1, // Selected Gym Timing ID
      subscriptionStartDate: new Date().toISOString(), // Start Date
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // End Date (30 days from now)
      resType: 1, // Response Type
      fcFileIndexID: 1 // File Index ID
    };

    console.log('Submitting data:', requestData);
    
    // Call the API
    await submitRequest(requestData);
  };

  return (
    <>
      {/* Comment Box */}
      <CommentTextArea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="xxx-xx-xxx-xx-xxx"
        maxLength={500}
        label="Comment (Max 500 Chars)"
      />

      {/* Loading and Error Messages */}
      {loading && (
        <div style={{ color: '#1976d2', marginBottom: 16 }}>
          Submitting your request...
        </div>
      )}
      
      {error && (
        <div style={{ color: '#f44336', marginBottom: 16 }}>
          Error: {error}
        </div>
      )}
      
      {data && (
        <div style={{ color: '#4caf50', marginBottom: 16 }}>
          Success! Your request has been submitted.
        </div>
      )}

      {/* Submit Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
        {data && (
          <ActionButton 
            variant="secondary"
            onClick={clear}
          >
            Submit Another
          </ActionButton>
        )}
        <ActionButton 
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </ActionButton>
      </div>

      {/* Debug Info */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontSize: '12px' }}>
        <strong>Debug Info:</strong>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Error: {error ? 'Yes' : 'No'}</div>
        <div>Data: {data ? 'Received' : 'None'}</div>
        {error && <div style={{ color: 'red' }}>Error details: {error}</div>}
      </div>
    </>
  );
};

export default FormActionsSection; 