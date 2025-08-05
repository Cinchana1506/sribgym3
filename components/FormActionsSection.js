import React, { useState } from 'react';
import { CommentTextArea, ActionButton } from './ReusableComponents';
import { useSubmitGymRequest, useUpdateGymRequestByEmployee } from '../hooks';

const FormActionsSection = ({ formData, isUpdateMode = false, onUpdate }) => {
  const [comment, setComment] = useState('');
  const { data, loading, error, submitRequest, clear } = useSubmitGymRequest();
  const { data: updateData, loading: updateLoading, error: updateError, updateRequest, clear: clearUpdate } = useUpdateGymRequestByEmployee();

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
      {(loading || updateLoading) && (
        <div style={{ color: '#1976d2', marginBottom: 16 }}>
          {isUpdateMode ? 'Updating your request...' : 'Submitting your request...'}
        </div>
      )}
      
      {(error || updateError) && (
        <div style={{ color: '#f44336', marginBottom: 16 }}>
          Error: {error || updateError}
        </div>
      )}
      
      {(data || updateData) && (
        <div style={{ color: '#4caf50', marginBottom: 16 }}>
          Success! Your request has been {isUpdateMode ? 'updated' : 'submitted'}.
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
        {(data || updateData) && (
          <ActionButton 
            variant="secondary"
            onClick={isUpdateMode ? clearUpdate : clear}
          >
            {isUpdateMode ? 'Update Another' : 'Submit Another'}
          </ActionButton>
        )}
        <ActionButton 
          variant="primary"
          onClick={isUpdateMode ? onUpdate : handleSubmit}
          disabled={loading || updateLoading}
        >
          {loading || updateLoading ? (isUpdateMode ? 'Updating...' : 'Submitting...') : (isUpdateMode ? 'Update' : 'Submit')}
        </ActionButton>
      </div>

      {/* Debug Info */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontSize: '12px' }}>
        <strong>Debug Info:</strong>
        <div>Mode: {isUpdateMode ? 'Update' : 'Submit'}</div>
        <div>Loading: {(loading || updateLoading) ? 'Yes' : 'No'}</div>
        <div>Error: {(error || updateError) ? 'Yes' : 'No'}</div>
        <div>Data: {(data || updateData) ? 'Received' : 'None'}</div>
        {(error || updateError) && <div style={{ color: 'red' }}>Error details: {error || updateError}</div>}
      </div>
    </>
  );
};

export default FormActionsSection; 