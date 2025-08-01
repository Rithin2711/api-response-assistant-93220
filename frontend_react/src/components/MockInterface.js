import React, { useState } from 'react';

// PUBLIC_INTERFACE
function MockInterface() {
  /**
   * Mock interface component for testing API requests
   * Provides request builder and real-time response display
   */
  const [request, setRequest] = useState({
    method: 'GET',
    url: '',
    headers: '{}',
    body: ''
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  const handleInputChange = (field, value) => {
    /**
     * Updates request configuration
     * @param {string} field - Field to update
     * @param {string} value - New value
     */
    setRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // PUBLIC_INTERFACE
  const sendRequest = async () => {
    /**
     * Sends API request and displays response
     */
    setLoading(true);
    
    try {
      // Simulate API request processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'X-Response-Time': '234ms'
        },
        data: {
          message: 'Mock response generated successfully',
          timestamp: new Date().toISOString(),
          request_id: Math.random().toString(36).substr(2, 9),
          data: {
            users: [
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ]
          }
        }
      };
      
      setResponse(mockResponse);
    } catch (error) {
      setResponse({
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mock-interface">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        {/* Request Builder */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Request Builder</h2>
            <p className="card-description">
              Configure and send API requests to test mock responses
            </p>
          </div>
          
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="method" className="form-label">HTTP Method</label>
              <select
                id="method"
                className="form-select"
                value={request.method}
                onChange={(e) => handleInputChange('method', e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="url" className="form-label">Request URL</label>
              <input
                id="url"
                type="text"
                className="form-input"
                placeholder="https://api.example.com/users"
                value={request.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="headers" className="form-label">Headers (JSON)</label>
              <textarea
                id="headers"
                className="form-textarea"
                placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                value={request.headers}
                onChange={(e) => handleInputChange('headers', e.target.value)}
                rows={3}
              />
            </div>
            
            {['POST', 'PUT', 'PATCH'].includes(request.method) && (
              <div className="form-group">
                <label htmlFor="body" className="form-label">Request Body</label>
                <textarea
                  id="body"
                  className="form-textarea"
                  placeholder='{"name": "John Doe", "email": "john@example.com"}'
                  value={request.body}
                  onChange={(e) => handleInputChange('body', e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>
          
          <div className="card-footer">
            <button 
              className="btn btn-primary"
              onClick={sendRequest}
              disabled={loading || !request.url}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Request'
              )}
            </button>
          </div>
        </div>
        
        {/* Response Display */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Response</h2>
            <p className="card-description">
              Real-time response display with validation feedback
            </p>
          </div>
          
          <div className="card-content">
            {!response && !loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--space-8)',
                color: 'var(--text-secondary)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>
                  📡
                </div>
                <p>Send a request to see the response</p>
              </div>
            )}
            
            {loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--space-8)'
              }}>
                <div className="loading-spinner" style={{ width: '32px', height: '32px' }}></div>
                <p style={{ marginTop: 'var(--space-4)' }}>Generating mock response...</p>
              </div>
            )}
            
            {response && (
              <div>
                <div style={{ 
                  marginBottom: 'var(--space-4)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  <strong>Status:</strong> {response.status} {response.statusText}
                </div>
                
                {response.headers && Object.keys(response.headers).length > 0 && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <h4 style={{ marginBottom: 'var(--space-2)' }}>Response Headers</h4>
                    <pre style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(response.headers, null, 2)}
                    </pre>
                  </div>
                )}
                
                <div>
                  <h4 style={{ marginBottom: 'var(--space-2)' }}>Response Body</h4>
                  <pre style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    overflow: 'auto',
                    maxHeight: '300px'
                  }}>
                    {JSON.stringify(response.data || response.error, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterface;
