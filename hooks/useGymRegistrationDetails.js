import { useState, useEffect, useCallback } from 'react';
import { getGymRegistrationDetails } from '../services/gymRegistrationService';

/**
 * Custom hook for getting gym registration details
 * @param {Object} options - Hook options
 * @param {number} options.searchtype - Search type (integer)
 * @param {number} options.isemphistory - Is employee history (integer)
 * @param {string} options.empname - Employee name (string)
 * @param {boolean} options.autoFetch - Whether to fetch data automatically on mount
 * @returns {Object} - Hook state and functions
 */
const useGymRegistrationDetails = ({ searchtype, isemphistory, empname, autoFetch = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch gym registration details
   * @param {Object} params - Query parameters
   * @param {number} params.searchtype - Search type (integer)
   * @param {number} params.isemphistory - Is employee history (integer)
   * @param {string} params.empname - Employee name (string)
   */
  const fetchGymRegistrationDetails = useCallback(async (params = {}) => {
    const { searchtype: st, isemphistory: ieh, empname: en } = params;
    const finalSearchType = st ?? searchtype;
    const finalIsEmpHistory = ieh ?? isemphistory;
    const finalEmpName = en ?? empname;

    // Validate required parameters
    if (!finalSearchType || !finalIsEmpHistory || !finalEmpName) {
      setError('Missing required parameters: searchtype, isemphistory, and empname are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getGymRegistrationDetails({
        searchtype: finalSearchType,
        isemphistory: finalIsEmpHistory,
        empname: finalEmpName,
      });
      
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
  }, [searchtype, isemphistory, empname]);

  /**
   * Refresh data with current parameters
   */
  const refresh = useCallback(() => {
    fetchGymRegistrationDetails();
  }, [fetchGymRegistrationDetails]);

  /**
   * Clear all data and error states
   */
  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Auto-fetch on mount if autoFetch is true and all required parameters are provided
  useEffect(() => {
    if (autoFetch && searchtype && isemphistory && empname) {
      fetchGymRegistrationDetails();
    }
  }, [autoFetch, searchtype, isemphistory, empname, fetchGymRegistrationDetails]);

  return {
    data,
    loading,
    error,
    fetchGymRegistrationDetails,
    refresh,
    clear,
  };
};

export default useGymRegistrationDetails; 