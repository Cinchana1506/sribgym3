import { useState, useEffect, useCallback } from 'react';
import { getPaymentStatus } from '../services/gymRegistrationService';

/**
 * Custom hook for fetching payment status
 * @param {Object} params - Query parameters
 * @param {number} params.mempid - Member/Employee ID
 * @param {string} params.year - Year (e.g., "2025")
 * @param {string} params.startmonth - Start month (e.g., "Jan")
 * @param {string} params.endmonth - End month (e.g., "July")
 * @param {boolean} params.autoFetch - Whether to fetch data automatically on mount (default: false)
 * @returns {Object} - Hook state and functions
 */
const usePaymentStatus = ({ mempid, year, startmonth, endmonth, autoFetch = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch payment status data
   * @param {Object} customParams - Optional custom parameters to override the hook params
   */
  const fetchPaymentStatus = useCallback(async (customParams = {}) => {
    const params = {
      mempid,
      year,
      startmonth,
      endmonth,
      ...customParams,
    };

    // Validate required parameters
    if (!params.mempid || !params.year || !params.startmonth || !params.endmonth) {
      setError('Missing required parameters: mempid, year, startmonth, and endmonth are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getPaymentStatus(params);
      
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
  }, [mempid, year, startmonth, endmonth]);

  /**
   * Refresh the data with current parameters
   */
  const refresh = useCallback(() => {
    fetchPaymentStatus();
  }, [fetchPaymentStatus]);

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
    if (autoFetch && mempid && year && startmonth && endmonth) {
      fetchPaymentStatus();
    }
  }, [autoFetch, mempid, year, startmonth, endmonth, fetchPaymentStatus]);

  return {
    data,
    loading,
    error,
    fetchPaymentStatus,
    refresh,
    clear,
  };
};

export default usePaymentStatus; 