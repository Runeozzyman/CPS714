// services/apiService.ts

const API_BASE_URL = process.env.GROUP5_API_BASE_URL;

let bearerToken: string | null = null;

const getBearerToken = async () => {
  if (bearerToken) {
    return bearerToken;
  }

  try {
    const apiKey = process.env.GROUP5_API_KEY;
    if (!apiKey) {
      throw new Error("API Key is not available in environment variables");
    }

    const response = await fetch(`${API_BASE_URL}/Token/GetToken?userId=${apiKey}`);
    if (response.ok) {
      const token = await response.text();
      bearerToken = token;
      return bearerToken;
    } else {
      console.error('Failed to fetch bearer token');
      return null;
    }
  } catch (error) {
    console.error('Error fetching bearer token:', error);
    return null;
  }
};

const apiRequest = async (endpoint: string, method: string, body?: any) => {
  try {
    const token = await getBearerToken();
    if (!token) {
      throw new Error('Bearer token is unavailable');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

export const apiService = {
  get: (endpoint: string) => apiRequest(endpoint, 'GET'),
  post: (endpoint: string, body: any) => apiRequest(endpoint, 'POST', body),
};