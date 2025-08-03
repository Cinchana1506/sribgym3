import { useState, useEffect, useCallback } from 'react';
import { getDetailsByMasterID } from '../services/gymRegistrationService';

/**
 * Custom hook for fetching details by master ID
 * @param {Object} params - Query parameters
 * @param {number} params.masterid - Master ID
 * @param {number} params.mempid - Member/Employee ID
 * @param {boolean} params.autoFetch - Whether to fetch data automatically on mount (default: false)
 * @returns {Object} - Hook state and functions
 */
const useDetailsByMasterID = ({ masterid, mempid, autoFetch = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch details by master ID data
   * @param {Object} customParams - Optional custom parameters to override the hook params
   */
  const fetchDetailsByMasterID = useCallback(async (customParams = {}) => {
    const params = {
      masterid,
      mempid,
      ...customParams,
    };

    // Validate required parameters
    if (!params.masterid || !params.mempid) {
      setError('Missing required parameters: masterid and mempid are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getDetailsByMasterID(params);
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
        setData(null);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [masterid, mempid]);

  /**
   * Refresh the data with current parameters
   */
  const refresh = useCallback(() => {
    fetchDetailsByMasterID();
  }, [fetchDetailsByMasterID]);

  /**
   * Clear all data and error states
   */
  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Auto-fetch on mount if enabled and all required params are provided
  useEffect(() => {
    if (autoFetch && masterid && mempid) {
      fetchDetailsByMasterID();
    }
  }, [autoFetch, masterid, mempid, fetchDetailsByMasterID]);

  return {
    data,
    loading,
    error,
    fetchDetailsByMasterID,
    refresh,
    clear,
  };
};

export default useDetailsByMasterID; 