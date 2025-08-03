import { useState, useCallback } from 'react';
import { updateGymRequestByGA } from '../services/gymRegistrationService';

/**
 * Custom hook for updating gym requests by GA (General Authority)
 * @returns {Object} - Hook state and functions
 */
const useUpdateGymRequestByGA = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Update gym request by GA
   * @param {Object} requestData - Request body for gym request update
   * @param {number} requestData.mEmpID - Member/Employee ID
   * @param {number} requestData.gymID - Gym ID
   * @param {number} requestData.regType - Registration Type
   * @param {number} requestData.paymentOption - Payment Option
   * @param {number} requestData.gymType - Gym Type
   * @param {number} requestData.selectedGymTID - Selected Gym Timing ID
   * @param {string} requestData.subscriptionStartDate - Subscription Start Date (ISO 8601 string)
   * @param {string} requestData.subscriptionEndDate - Subscription End Date (ISO 8601 string)
   * @param {number} requestData.resType - Response Type
   * @param {number} requestData.fcFileIndexID - File Index ID
   */
  const updateRequest = useCallback(async (requestData) => {
    // Validate required parameters
    if (!requestData.mEmpID || !requestData.gymID || !requestData.regType || 
        !requestData.paymentOption || !requestData.gymType || !requestData.selectedGymTID ||
        !requestData.subscriptionStartDate || !requestData.subscriptionEndDate ||
        !requestData.resType || !requestData.fcFileIndexID) {
      setError('Missing required parameters: All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await updateGymRequestByGA(requestData);
      
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
  }, []);

  /**
   * Clear all data and error states
   */
  const clear = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    updateRequest,
    clear,
  };
};

export default useUpdateGymRequestByGA; 