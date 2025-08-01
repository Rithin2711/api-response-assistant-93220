import React, { useState } from 'react';

// PUBLIC_INTERFACE
function ApiKeyManager({ apiKeys, onApiKeyUpdate }) {
  /**
   * API key manager component for secure storage and management of LLM provider keys
   * Provides secure in-browser key entry and management
   * 
   * @param {Object} apiKeys - Current API keys by provider
   * @param {function} onApiKeyUpdate - Function to update API key
   */
  const [showKeys, setShowKeys] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [keyInputs, setKeyInputs] = useState({});

  const providers = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Google AI Studio API key for Gemini models',
      icon: '🧠',
      keyFormat: 'AIza...',
      instructions: 'Get your API key from Google AI Studio (makersuite.google.com)'
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'OpenAI API key for GPT models',
      icon: '🤖',
      keyFormat: 'sk-...',
      instructions: 'Get your API key from OpenAI Platform (platform.openai.com)'
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      description: 'Anthropic API key for Claude models',
      icon: '🎭',
      keyFormat: 'sk-ant-...',
      instructions: 'Get your API key from Anthropic Console (console.anthropic.com)'
    }
  ];

  // PUBLIC_INTERFACE
  const toggleKeyVisibility = (providerId) => {
    /**
     * Toggles visibility of API key for security
     * @param {string} providerId - Provider ID
     */
    setShowKeys(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  // PUBLIC_INTERFACE
  const startEditing = (providerId) => {
    /**
     * Starts editing mode for API key
     * @param {string} providerId - Provider ID
     */
    setEditingKey(providerId);
    setKeyInputs(prev => ({
      ...prev,
      [providerId]: apiKeys[providerId] || ''
    }));
  };

  // PUBLIC_INTERFACE
  const cancelEditing = () => {
    /**
     * Cancels editing and resets input
     */
    setEditingKey(null);
    setKeyInputs({});
  };

  // PUBLIC_INTERFACE
  const saveKey = (providerId) => {
    /**
     * Saves the API key for the provider
     * @param {string} providerId - Provider ID
     */
    const key = keyInputs[providerId];
    if (key && key.trim()) {
      onApiKeyUpdate(providerId, key.trim());
      setEditingKey(null);
      setKeyInputs(prev => ({ ...prev, [providerId]: '' }));
    }
  };

  // PUBLIC_INTERFACE
  const removeKey = (providerId) => {
    /**
     * Removes the API key for the provider
     * @param {string} providerId - Provider ID
     */
    if (window.confirm('Are you sure you want to remove this API key?')) {
      onApiKeyUpdate(providerId, '');
      setShowKeys(prev => ({ ...prev, [providerId]: false }));
    }
  };

  // PUBLIC_INTERFACE
  const maskKey = (key) => {
    /**
     * Masks API key for secure display
     * @param {string} key - API key to mask
     * @returns {string} Masked key
     */
    if (!key) return '';
    if (key.length <= 8) return '*'.repeat(key.length);
    return key.substring(0, 4) + '*'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  // PUBLIC_INTERFACE
  const testConnection = async (providerId) => {
    /**
     * Tests API connection with the provider
     * @param {string} providerId - Provider ID
     */
    console.log(`Testing connection for ${providerId}`);
    // Implementation would test the actual API connection
  };

  return (
    <div className="api-key-manager">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">API Key Management</h2>
          <p className="card-description">
            Securely manage your LLM provider API keys. Keys are stored locally in your browser.
          </p>
        </div>
        
        <div className="card-content">
          <div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--color-warning-50)', border: '1px solid var(--color-warning-200)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: '20px' }}>🔒</span>
              <strong>Security Notice</strong>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              API keys are stored securely in your browser's local storage and are never sent to our servers. 
              They are only used to make direct requests to the respective LLM providers.
            </p>
          </div>
          
          <div className="provider-keys">
            {providers.map((provider) => {
              const hasKey = apiKeys[provider.id];
              const isEditing = editingKey === provider.id;
              
              return (
                <div 
                  key={provider.id}
                  className="provider-key-item"
                  style={{
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: '24px' }}>{provider.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <h3 style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          {provider.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          {hasKey && (
                            <span style={{
                              fontSize: 'var(--font-size-xs)',
                              padding: 'var(--space-1) var(--space-2)',
                              backgroundColor: 'var(--color-success-100)',
                              color: 'var(--color-success-700)',
                              borderRadius: 'var(--radius-sm)'
                            }}>
                              ✓ Configured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                        {provider.description}
                      </p>
                      
                      {isEditing ? (
                        <div style={{ marginBottom: 'var(--space-3)' }}>
                          <div className="form-group">
                            <label htmlFor={`key-${provider.id}`} className="form-label">
                              API Key (format: {provider.keyFormat})
                            </label>
                            <input
                              id={`key-${provider.id}`}
                              type="password"
                              className="form-input"
                              placeholder={`Enter your ${provider.name} API key`}
                              value={keyInputs[provider.id] || ''}
                              onChange={(e) => setKeyInputs(prev => ({
                                ...prev,
                                [provider.id]: e.target.value
                              }))}
                            />
                            <div className="form-help">
                              {provider.instructions}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => saveKey(provider.id)}
                            >
                              Save Key
                            </button>
                            <button 
                              className="btn btn-outline btn-sm"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : hasKey ? (
                        <div style={{ marginBottom: 'var(--space-3)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--space-2)',
                            padding: 'var(--space-2)',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: 'var(--space-2)'
                          }}>
                            <code style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                              {showKeys[provider.id] ? apiKeys[provider.id] : maskKey(apiKeys[provider.id])}
                            </code>
                            <button
                              className="btn btn-ghost"
                              onClick={() => toggleKeyVisibility(provider.id)}
                              style={{ padding: 'var(--space-1)' }}
                            >
                              {showKeys[provider.id] ? '👁️‍🗨️' : '👁️'}
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button 
                              className="btn btn-outline btn-sm"
                              onClick={() => testConnection(provider.id)}
                            >
                              Test Connection
                            </button>
                            <button 
                              className="btn btn-outline btn-sm"
                              onClick={() => startEditing(provider.id)}
                            >
                              Edit Key
                            </button>
                            <button 
                              className="btn btn-ghost btn-sm"
                              onClick={() => removeKey(provider.id)}
                              style={{ color: 'var(--color-error-600)' }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => startEditing(provider.id)}
                          >
                            Add API Key
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiKeyManager;
