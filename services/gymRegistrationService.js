import gymRegistrationClient from './apiClient';

/**
 * Gym Registration API Service
 * Handles all gym registration related API calls
 */

/**
 * Get batch timings for gym registration
 * @param {Object} params - Query parameters
 * @param {number} params.gymtype - Gym type ID
 * @param {number} params.gymid - Gym ID
 * @param {number} params.mempid - Member/Employee ID
 * @returns {Promise<Object>} - Batch timings data
 */
export const getBatchTimings = async ({ gymtype, gymid, mempid }) => {
  try {
    const response = await gymRegistrationClient.get('/api/GymRegistration/GetBatchTimings', {
      params: {
        gymtype,
        gymid,
        mempid,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching batch timings:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch batch timings',
      status: error.response?.status,
    };
  }
};

/**
 * Get gym registration workflow status
 * @param {Object} params - Query parameters
 * @param {number} params.mempid - Member/Employee ID
 * @returns {Promise<Object>} - Workflow status data
 */
export const getGymWorkflowStatus = async ({ mempid }) => {
  try {
    const response = await gymRegistrationClient.get('/api/GymRegistration/GetGymWFStatus', {
      params: {
        mempid,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching gym workflow status:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch gym workflow status',
      status: error.response?.status,
    };
  }
};

/**
 * Get details by master ID
 * @param {Object} params - Query parameters
 * @param {number} params.masterid - Master ID
 * @param {number} params.mempid - Member/Employee ID
 * @returns {Promise<Object>} - Details data
 */
export const getDetailsByMasterID = async ({ masterid, mempid }) => {
  try {
    const response = await gymRegistrationClient.get('/api/GymRegistration/GetDetailsByMasterID', {
      params: {
        masterid,
        mempid,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching details by master ID:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch details by master ID',
      status: error.response?.status,
    };
  }
};

/**
 * Get employee registration details
 * @param {Object} params - Query parameters
 * @param {number} params.mempid - Member/Employee ID
 * @returns {Promise<Object>} - Employee registration details data
 */
export const getEmployeeRegistrationDetails = async ({ mempid }) => {
  try {
    const response = await gymRegistrationClient.get('/api/GymRegistration/GetEmployeeRegistrationDetails', {
      params: {
        mempid,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching employee registration details:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch employee registration details',
      status: error.response?.status,
    };
  }
};


/**
 * Get payment status
 * @param {Object} params - Query parameters
 * @param {number} params.mempid - Member/Employee ID
 * @param {string} params.year - Year (e.g., "2025")
 * @param {string} params.startmonth - Start month (e.g., "Jan")
 * @param {string} params.endmonth - End month (e.g., "July")
 * @returns {Promise<Object>} - Payment status data
 */
export const getPaymentStatus = async ({ mempid, year, startmonth, endmonth }) => {
  try {
    const response = await gymRegistrationClient.get('/api/GymRegistration/GetPaymentStatus', {
      params: {
        mempid,
        year,
        startmonth,
        endmonth,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching payment status:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch payment status',
      status: error.response?.status,
    };
  }
};

/**
 * Submit a new gym registration request
 * @param {Object} data - Request body for gym registration
 * @param {number} data.mEmpID - Member/Employee ID
 * @param {number} data.gymID - Gym ID
 * @param {number} data.regType - Registration Type
 * @param {number} data.paymentOption - Payment Option
 * @param {number} data.gymType - Gym Type
 * @param {number} data.selectedGymTID - Selected Gym Timing ID
 * @param {string} data.subscriptionStartDate - Subscription Start Date (ISO 8601 string)
 * @param {string} data.subscriptionEndDate - Subscription End Date (ISO 8601 string)
 * @param {number} data.resType - Response Type
 * @param {number} data.fcFileIndexID - File Index ID
 * @returns {Promise<Object>} - Submission result data
 */
export const submitGymRequest = async (data) => {
  try {
    const response = await gymRegistrationClient.post('/api/GymRegistration/SubmitGymRequest', data);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error submitting gym request:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to submit gym request',
      status: error.response?.status,
    };
  }
};

/**
 * Update gym request by GA (General Authority)
 * @param {Object} data - Request body for gym request update
 * @param {number} data.mEmpID - Member/Employee ID
 * @param {number} data.gymID - Gym ID
 * @param {number} data.regType - Registration Type
 * @param {number} data.paymentOption - Payment Option
 * @param {number} data.gymType - Gym Type
 * @param {number} data.selectedGymTID - Selected Gym Timing ID
 * @param {string} data.subscriptionStartDate - Subscription Start Date (ISO 8601 string)
 * @param {string} data.subscriptionEndDate - Subscription End Date (ISO 8601 string)
 * @param {number} data.resType - Response Type
 * @param {number} data.fcFileIndexID - File Index ID
 * @returns {Promise<Object>} - Update result data
 */
export const updateGymRequestByGA = async (data) => {
  try {
    const response = await gymRegistrationClient.post('/api/GymRegistration/UpdateGymRequestByGA', data);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating gym request by GA:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to update gym request by GA',
      status: error.response?.status,
    };
  }
};

/**
 * Update gym request by Employee
 * @param {Object} data - Request body for gym request update
 * @param {number} data.mEmpID - Member/Employee ID
 * @param {number} data.gymID - Gym ID
 * @param {number} data.regType - Registration Type
 * @param {number} data.paymentOption - Payment Option
 * @param {number} data.gymType - Gym Type
 * @param {number} data.selectedGymTID - Selected Gym Timing ID
 * @param {string} data.subscriptionStartDate - Subscription Start Date (ISO 8601 string)
 * @param {string} data.subscriptionEndDate - Subscription End Date (ISO 8601 string)
 * @param {number} data.resType - Response Type
 * @param {number} data.fcFileIndexID - File Index ID
 * @returns {Promise<Object>} - Update result data
 */
export const updateGymRequestByEmployee = async (data) => {
  try {
    const response = await gymRegistrationClient.post('/api/GymRegistration/UpdateGymRequestByEmployee', data);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating gym request by Employee:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to update gym request by Employee',
      status: error.response?.status,
    };
  }
};

/**
 * Get gym registration details
 * @param {Object} params - Query parameters
 * @param {number} params.searchtype - Search type (integer)
 * @param {number} params.isemphistory - Is employee history (integer)
 * @param {string} params.empname - Employee name (string)
 * @returns {Promise<Object>} - Gym registration details data
 */
export const getGymRegistrationDetails = async ({ searchtype, isemphistory, empname }) => {
  try {
    const response = await gymRegistrationClient.get('/api/GymRegistration/GetGymRegistrationDetails', {
      params: {
        searchtype,
        isemphistory,
        empname,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching gym registration details:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch gym registration details',
      status: error.response?.status,
    };
  }
};

// Export all services
export default {
  getBatchTimings,
  getGymWorkflowStatus,
  getDetailsByMasterID,
  getEmployeeRegistrationDetails,
  getPaymentStatus,
  submitGymRequest,
  updateGymRequestByGA,
  updateGymRequestByEmployee,
  getGymRegistrationDetails,
}; 