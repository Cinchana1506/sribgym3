import { useState, useEffect, useCallback } from 'react';
import { getEmployeeRegistrationDetails } from '../services/gymRegistrationService';

/**
 * Custom hook for fetching employee registration details
 * @param {Object} params - Query parameters
 * @param {number} params.mempid - Member/Employee ID
 * @param {boolean} params.autoFetch - Whether to fetch data automatically on mount (default: false)
 * @returns {Object} - Hook state and functions
 */
const useEmployeeRegistrationDetails = ({ mempid, autoFetch = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch employee registration details data
   * @param {Object} customParams - Optional custom parameters to override the hook params
   */
  const fetchEmployeeRegistrationDetails = useCallback(async (customParams = {}) => {
    const params = {
      mempid,
      ...customParams,
    };

    // Validate required parameters
    if (!params.mempid) {
      setError('Missing required parameter: mempid is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getEmployeeRegistrationDetails(params);
      
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
  }, [mempid]);

  /**
   * Refresh the data with current parameters
   */
  const refresh = useCallback(() => {
    fetchEmployeeRegistrationDetails();
  }, [fetchEmployeeRegistrationDetails]);

  /**
   * Clear all data and error states
   */
  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Auto-fetch on mount if enabled and required param is provided
  useEffect(() => {
    if (autoFetch && mempid) {
      fetchEmployeeRegistrationDetails();
    }
  }, [autoFetch, mempid, fetchEmployeeRegistrationDetails]);

  return {
    data,
    loading,
    error,
    fetchEmployeeRegistrationDetails,
    refresh,
    clear,
  };
};

export default useEmployeeRegistrationDetails; 