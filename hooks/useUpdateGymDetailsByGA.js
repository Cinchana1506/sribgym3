import { useState, useCallback } from 'react';
import { updateGymDetailsByGA } from '../services/gymRegistrationService';

/**
 * Custom hook for updating gym details by GA (General Affairs)
 * @param {Object} options - Hook options
 * @param {boolean} options.autoReset - Whether to auto-reset state after successful update
 * @returns {Object} Hook state and methods
 */
const useUpdateGymDetailsByGA = ({ autoReset = true } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGymDetails = useCallback(async (updateData) => {
    if (!updateData.masterid || !updateData.mempid || !updateData.status) {
      setError('Missing required parameters: masterid, mempid, and status are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await updateGymDetailsByGA(updateData);
      if (result.success) {
        setData(result.data);
        setError(null);
        
        // Auto-reset after successful update if enabled
        if (autoReset) {
          setTimeout(() => {
            setData(null);
          }, 3000);
        }
      } else {
        setError(result.error);
        setData(null);
      }
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred while updating gym details';
      setError(errorMessage);
      setData(null);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [autoReset]);

  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    clear();
  }, [clear]);

  return {
    data,
    loading,
    error,
    updateGymDetails,
    clear,
    reset,
  };
};

export default useUpdateGymDetailsByGA;
