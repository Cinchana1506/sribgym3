import { useState, useEffect, useCallback } from 'react';
import { getEmployeeRegistrationDetails } from '../services/gymRegistrationService';

const useEmployeeRegistrationDetails = ({ mempid, autoFetch = true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployeeDetails = useCallback(async () => {
    if (!mempid) {
      setError('Employee ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getEmployeeRegistrationDetails({ mempid });
      
      if (result.success) {
        setData(result);
      } else {
        setError(result.error);
        setData(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch employee details');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mempid]);

  useEffect(() => {
    if (autoFetch && mempid) {
      fetchEmployeeDetails();
    }
  }, [autoFetch, mempid, fetchEmployeeDetails]);

  return {
    data,
    loading,
    error,
    fetchEmployeeDetails,
  };
};

export default useEmployeeRegistrationDetails; 