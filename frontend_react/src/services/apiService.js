import axios from 'axios';

// Configure base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens or other headers
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or additional headers here
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response patterns
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
export const apiService = {
  /**
   * Health check endpoint
   * @returns {Promise} API response
   */
  healthCheck: () => apiClient.get('/health'),

  /**
   * Upload file for processing
   * @param {File} file - File to upload
   * @param {function} onProgress - Progress callback
   * @returns {Promise} Upload response
   */
  uploadFile: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  },

  /**
   * Send mock API request
   * @param {Object} requestData - Request configuration
   * @returns {Promise} Mock response
   */
  sendMockRequest: (requestData) => {
    return apiClient.post('/mock/request', requestData);
  },

  /**
   * Get validation reports
   * @returns {Promise} Reports list
   */
  getReports: () => apiClient.get('/reports'),

  /**
   * Get specific report by ID
   * @param {string} reportId - Report ID
   * @returns {Promise} Report data
   */
  getReport: (reportId) => apiClient.get(`/reports/${reportId}`),

  /**
   * Download report in specified format
   * @param {string} reportId - Report ID
   * @param {string} format - Export format (pdf, json, excel)
   * @returns {Promise} File download
   */
  downloadReport: (reportId, format) => {
    return apiClient.get(`/reports/${reportId}/download`, {
      params: { format },
      responseType: 'blob',
    });
  },

  /**
   * Save LLM settings
   * @param {Object} settings - LLM configuration
   * @returns {Promise} Save response
   */
  saveLLMSettings: (settings) => {
    return apiClient.post('/settings/llm', settings);
  },

  /**
   * Get LLM settings
   * @returns {Promise} Settings data
   */
  getLLMSettings: () => apiClient.get('/settings/llm'),

  /**
   * Test LLM provider connection
   * @param {string} provider - Provider name
   * @param {string} apiKey - API key
   * @returns {Promise} Connection test result
   */
  testLLMConnection: (provider, apiKey) => {
    return apiClient.post('/llm/test-connection', { provider, apiKey });
  },

  /**
   * Get conversation history
   * @param {Object} params - Query parameters
   * @returns {Promise} Conversations list
   */
  getConversations: (params = {}) => {
    return apiClient.get('/conversations', { params });
  },

  /**
   * Get specific conversation
   * @param {string} conversationId - Conversation ID
   * @returns {Promise} Conversation data
   */
  getConversation: (conversationId) => {
    return apiClient.get(`/conversations/${conversationId}`);
  },

  /**
   * Delete conversation
   * @param {string} conversationId - Conversation ID
   * @returns {Promise} Delete response
   */
  deleteConversation: (conversationId) => {
    return apiClient.delete(`/conversations/${conversationId}`);
  },

  /**
   * Generate mock response using LLM
   * @param {Object} requestData - Request data and context
   * @returns {Promise} Generated response
   */
  generateMockResponse: (requestData) => {
    return apiClient.post('/llm/generate-response', requestData);
  },

  /**
   * Validate API response against documentation
   * @param {Object} validationData - Response and documentation data
   * @returns {Promise} Validation result
   */
  validateResponse: (validationData) => {
    return apiClient.post('/llm/validate-response', validationData);
  },
};

// Export individual methods for convenience
export const {
  healthCheck,
  uploadFile,
  sendMockRequest,
  getReports,
  getReport,
  downloadReport,
  saveLLMSettings,
  getLLMSettings,
  testLLMConnection,
  getConversations,
  getConversation,
  deleteConversation,
  generateMockResponse,
  validateResponse,
} = apiService;

export default apiService;
