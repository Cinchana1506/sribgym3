import { useState, useEffect, useCallback } from 'react';
import { getBatchTimings } from '../services/gymRegistrationService';

/**
 * Custom hook for fetching batch timings
 * @param {Object} params - Query parameters
 * @param {number} params.gymtype - Gym type ID
 * @param {number} params.gymid - Gym ID
 * @param {number} params.mempid - Member/Employee ID
 * @param {boolean} params.autoFetch - Whether to fetch data automatically on mount (default: false)
 * @returns {Object} - Hook state and functions
 */
const useBatchTimings = ({ gymtype, gymid, mempid, autoFetch = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch batch timings data
   * @param {Object} customParams - Optional custom parameters to override the hook params
   */
  const fetchBatchTimings = useCallback(async (customParams = {}) => {
    const params = {
      gymtype,
      gymid,
      mempid,
      ...customParams,
    };

    // Validate required parameters
    if (!params.gymtype || !params.gymid || !params.mempid) {
      setError('Missing required parameters: gymtype, gymid, and mempid are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getBatchTimings(params);
      
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
  }, [gymtype, gymid, mempid]);

  /**
   * Refresh the data with current parameters
   */
  const refresh = useCallback(() => {
    fetchBatchTimings();
  }, [fetchBatchTimings]);

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
    if (autoFetch && gymtype && gymid && mempid) {
      fetchBatchTimings();
    }
  }, [autoFetch, gymtype, gymid, mempid, fetchBatchTimings]);

  return {
    data,
    loading,
    error,
    fetchBatchTimings,
    refresh,
    clear,
  };
};

export default useBatchTimings; 