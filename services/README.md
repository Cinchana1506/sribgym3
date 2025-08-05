# GetBatchTimings API Implementation Guide

## Overview

The `/api/GymRegistration/GetBatchTimings` API is fully implemented in the SamGym application. This API retrieves available gym batch timings based on gym type, gym ID, and member ID.

## API Endpoint

```
GET /api/GymRegistration/GetBatchTimings
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `gymtype` | number | Yes | Gym type ID |
| `gymid` | number | Yes | Gym ID |
| `mempid` | number | Yes | Member/Employee ID |

### Example Request

```bash
curl -X 'GET' \
'http://107.108.5.184:60/api/GymRegistration/GetBatchTimings?gymtype=1&gymid=5&mempid=133' \
-H 'accept: */*'
```

### Response Format

```json
{
  "status": true,
  "data": [
    {
      "isSelected": 0,
      "gymTID": 8,
      "timingDesc": "6.00 AM To 7.00 AM",
      "prefNo": 0,
      "maxCount": 90,
      "userCount": 5,
      "currentStatus": ""
    },
    {
      "isSelected": 0,
      "gymTID": 9,
      "timingDesc": "7.00 AM To 8.00 AM",
      "prefNo": 0,
      "maxCount": 90,
      "userCount": 9,
      "currentStatus": ""
    }
  ]
}
```

## Implementation Components

### 1. API Service Layer

**File:** `src/services/gymRegistrationService.js`

```javascript
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
```

### 2. Custom React Hook

**File:** `src/hooks/useBatchTimings.js`

The hook provides:
- State management (data, loading, error)
- Automatic data fetching
- Error handling
- Refresh functionality

```javascript
const { data, loading, error, fetchBatchTimings, refresh, clear } = useBatchTimings({
  gymtype: 1,
  gymid: 5,
  mempid: 133,
  autoFetch: true
});
```

### 3. Enhanced TimeSlotSelector Component

**File:** `src/components/TimeSlotSelector.js`

The component now uses real API data instead of hardcoded slots:

```javascript
<TimeSlotSelector
  gymtype={1}
  gymid={5}
  mempid={133}
  selectedSlot={selectedTimeSlot}
  onSelect={handleTimeSlotSelect}
  autoFetch={true}
/>
```

## Usage Examples

### Basic Usage in a Component

```javascript
import React from 'react';
import { useBatchTimings } from '../hooks';

const MyComponent = () => {
  const { data, loading, error, fetchBatchTimings } = useBatchTimings({
    gymtype: 1,
    gymid: 5,
    mempid: 133,
    autoFetch: true
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.data?.map(timing => (
        <div key={timing.gymTID}>
          {timing.timingDesc} - {timing.userCount}/{timing.maxCount} users
        </div>
      ))}
    </div>
  );
};
```

### Manual Fetching

```javascript
const { data, loading, error, fetchBatchTimings } = useBatchTimings({
  autoFetch: false
});

const handleFetch = () => {
  fetchBatchTimings({
    gymtype: 1,
    gymid: 5,
    mempid: 133
  });
};
```

## Testing the API

### Option 1: Use the Example Component

Navigate to `/batch-timings` in your application to test the API with a user interface.

### Option 2: Use Browser Developer Tools

1. Open browser developer tools (F12)
2. Go to Network tab
3. Navigate to the batch timings page
4. Look for the API call to `/api/GymRegistration/GetBatchTimings`

### Option 3: Use API Testing Tools

Use tools like Postman, Insomnia, or curl to test the API directly:

```bash
curl -X GET "http://107.108.5.184:60/api/GymRegistration/GetBatchTimings?gymtype=1&gymid=5&mempid=133"
```

## Error Handling

The implementation includes comprehensive error handling:

1. **Network Errors**: Handled in the service layer
2. **API Errors**: Parsed from response
3. **Validation Errors**: Checked for required parameters
4. **UI Error States**: Displayed to users with retry options

## Data Flow

1. **Component** calls `useBatchTimings` hook
2. **Hook** calls `getBatchTimings` service function
3. **Service** makes HTTP request to API
4. **API** returns batch timings data
5. **Service** processes response and returns result
6. **Hook** updates state with data/error
7. **Component** renders based on state

## Configuration

### Base URL

The API base URL is configured in `src/services/apiClient.js`:

```javascript
const gymRegistrationClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://107.108.5.184:60',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Environment Variables

You can override the base URL using environment variables:

```bash
REACT_APP_API_BASE_URL=http://your-api-server:port
```

## Integration Points

The API is integrated with:

1. **TimeSlotSelector**: For selecting gym time slots
2. **EmployeeSubmissionForm**: For gym registration
3. **BatchTimingsExample**: For testing and demonstration

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the API server allows requests from your frontend domain
2. **Network Timeout**: Check if the API server is accessible
3. **Authentication**: Verify if authentication tokens are required
4. **Parameter Validation**: Ensure all required parameters are provided

### Debug Steps

1. Check browser network tab for failed requests
2. Verify API endpoint is correct
3. Confirm parameters are properly formatted
4. Check server logs for errors
5. Test API directly with curl or Postman

## Future Enhancements

Potential improvements:

1. **Caching**: Implement caching for frequently accessed data
2. **Real-time Updates**: Add WebSocket support for live updates
3. **Pagination**: Support for large datasets
4. **Filtering**: Add filtering options for time slots
5. **Booking Integration**: Direct booking from time slot selection 