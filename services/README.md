# API Integration Documentation

This document describes the API integration setup for the SamGym React application.

## Structure

```
src/
├── services/
│   ├── apiClient.js          # Base Axios configuration
│   ├── gymRegistrationService.js  # Gym registration API functions
│   └── index.js              # Service exports
├── hooks/
│   ├── useBatchTimings.js    # Custom hook for batch timings
│   └── index.js              # Hook exports
└── components/
    └── BatchTimingsExample.js # Example usage component
```

## Configuration

### Environment Variables

Create a `.env` file in your project root and add:

```env
REACT_APP_API_BASE_URL=https://your-api-base-url.com
```

If not set, the default URL will be used (you should update this in `apiClient.js`).

## Usage

### Using the Service Directly

```javascript
import { getBatchTimings } from '../services/gymRegistrationService';

const fetchData = async () => {
  const result = await getBatchTimings({
    gymtype: 1,
    gymid: 123,
    mempid: 456
  });
  
  if (result.success) {
    console.log('Data:', result.data);
  } else {
    console.error('Error:', result.error);
  }
};
```

### Using the Custom Hook

```javascript
import { useBatchTimings } from '../hooks';

const MyComponent = () => {
  const { data, loading, error, fetchBatchTimings, refresh, clear } = useBatchTimings({
    gymtype: 1,
    gymid: 123,
    mempid: 456,
    autoFetch: true // Optional: fetch automatically on mount
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {/* Your component content */}
      <button onClick={refresh}>Refresh</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
```

## API Endpoints

### GET /api/GymRegistration/GetBatchTimings

**Parameters:**
- `gymtype` (int): Gym type ID
- `gymid` (int): Gym ID  
- `mempid` (int): Member/Employee ID

**Response:** Batch timings data

### GET /api/GymRegistration/GetGymWFStatus

**Parameters:**
- `gymid` (int): Gym ID
- `mempid` (int): Member/Employee ID

**Response:** Gym workflow status data

## Error Handling

The service layer includes comprehensive error handling:

- Network errors
- API errors (4xx, 5xx status codes)
- Authentication errors (401)
- Timeout errors

All errors are logged to the console and returned in a consistent format.

## Security

- Authentication tokens are automatically added to requests if available in localStorage
- Tokens are removed on 401 responses
- All requests include proper headers and timeout configuration

## Adding New APIs

1. Add the API function to `gymRegistrationService.js`
2. Create a custom hook in the `hooks/` folder
3. Export the hook from `hooks/index.js`
4. Update this documentation

## Testing

Use the `BatchTimingsExample` component to test the API integration:

```javascript
import BatchTimingsExample from '../components/BatchTimingsExample';

// Add to your app for testing
<BatchTimingsExample />
``` 