import React, { useState } from 'react';
import { useBatchTimings } from '../hooks';

/**
 * Example component demonstrating how to use the useBatchTimings hook
 * This component shows how to integrate the API without affecting existing UI
 */
const BatchTimingsExample = () => {
  const [params, setParams] = useState({
    gymtype: '',
    gymid: '',
    mempid: '',
  });

  // Using the custom hook
  const { data, loading, error, fetchBatchTimings, refresh, clear } = useBatchTimings({
    ...params,
    autoFetch: false, // Set to true if you want to fetch automatically when params change
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseInt(value) || '',
    }));
  };

  const handleFetch = () => {
    fetchBatchTimings();
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleClear = () => {
    clear();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Batch Timings API Integration Example</h2>
      
      {/* Parameter Inputs */}
      <div style={{ marginBottom: '20px' }}>
        <h3>API Parameters</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="number"
            name="gymtype"
            placeholder="Gym Type ID"
            value={params.gymtype}
            onChange={handleInputChange}
            style={{ padding: '8px', flex: 1 }}
          />
          <input
            type="number"
            name="gymid"
            placeholder="Gym ID"
            value={params.gymid}
            onChange={handleInputChange}
            style={{ padding: '8px', flex: 1 }}
          />
          <input
            type="number"
            name="mempid"
            placeholder="Member ID"
            value={params.mempid}
            onChange={handleInputChange}
            style={{ padding: '8px', flex: 1 }}
          />
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleFetch}
            disabled={loading || !params.gymtype || !params.gymid || !params.mempid}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Loading...' : 'Fetch Batch Timings'}
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
          Loading batch timings...
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
          <h3>Batch Timings Data</h3>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px', 
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Usage Instructions */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
        <h4>How to use this hook in your components:</h4>
        <pre style={{ fontSize: '12px' }}>
{`// Import the hook
import { useBatchTimings } from '../hooks';

// Use in your component
const MyComponent = () => {
  const { data, loading, error, fetchBatchTimings } = useBatchTimings({
    gymtype: 1,
    gymid: 123,
    mempid: 456,
    autoFetch: true // Optional: fetch automatically on mount
  });

  // Your component logic here
};`}
        </pre>
      </div>
    </div>
  );
};

export default BatchTimingsExample; 