import React, { useState } from 'react';
import { useGymWorkflowStatus } from '../hooks';

/**
 * Example component demonstrating how to use the GetGymWFStatus API
 * Based on the API response structure from your screenshots
 */
const GymWorkflowStatusExample = () => {
  const [mempid, setMempid] = useState('133');

  // Using the custom hook
  const { data, loading, error, fetchGymWorkflowStatus, refresh, clear } = useGymWorkflowStatus({
    mempid: parseInt(mempid) || null,
    autoFetch: false,
  });

  const handleInputChange = (e) => {
    setMempid(e.target.value);
  };

  const handleFetch = () => {
    fetchGymWorkflowStatus();
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleClear = () => {
    clear();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>GetGymWFStatus API Example</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        This component demonstrates the /api/GymRegistration/GetGymWFStatus endpoint.
      </p>

      {/* API Parameters */}
      <div style={{ marginBottom: '20px' }}>
        <h3>API Parameters</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Member ID (mempid):
          </label>
          <input
            type="number"
            value={mempid}
            onChange={handleInputChange}
            placeholder="Enter Member ID"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleFetch}
            disabled={loading || !mempid}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Loading...' : 'Fetch Workflow Status'}
          </button>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Refresh
          </button>
          <button 
            onClick={handleClear}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', marginBottom: '10px' }}>
          Loading workflow status...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '10px' }}>
          Error: {error}
        </div>
      )}

      {/* Data Display */}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h3>Workflow Status Data</h3>
          
          {/* Status Summary */}
          <div style={{ marginBottom: '15px' }}>
            <strong>API Status:</strong> {data.status ? 'Success' : 'Failed'}
          </div>

          {/* Workflow Data */}
          {data.data && data.data.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4>Workflow Details</h4>
              <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
                {data.data.map((workflow, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div><strong>Pending WF ID:</strong> {workflow.pendingWFID}</div>
                    <div><strong>Status:</strong> {workflow.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          {data.message && (
            <div style={{ marginBottom: '15px' }}>
              <strong>Message:</strong> {data.message}
            </div>
          )}

          {/* Raw JSON Response */}
          <div style={{ marginTop: '20px' }}>
            <h4>Raw JSON Response</h4>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '4px', 
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
        <h4>How to use this hook in your components:</h4>
        <pre style={{ fontSize: '12px' }}>
{`// Import the hook
import { useGymWorkflowStatus } from '../hooks';

// Use in your component
const MyComponent = () => {
  const { data, loading, error, fetchGymWorkflowStatus } = useGymWorkflowStatus({
    mempid: 133,
    autoFetch: true // Optional: fetch automatically on mount
  });

  // Your component logic here
};`}
        </pre>
      </div>
    </div>
  );
};

export default GymWorkflowStatusExample; 