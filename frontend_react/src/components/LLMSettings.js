import React, { useState } from 'react';

// PUBLIC_INTERFACE
function LLMSettings({ selectedLLM, onLLMChange }) {
  /**
   * LLM settings component for configuring language model providers
   * Allows selection and configuration of different LLM providers
   * 
   * @param {string} selectedLLM - Currently selected LLM provider
   * @param {function} onLLMChange - Function to change LLM provider
   */
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0
  });

  const llmProviders = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Google\'s advanced language model with excellent reasoning capabilities',
      icon: '🧠',
      features: ['High accuracy', 'Fast responses', 'Multimodal support']
    },
    {
      id: 'openai',
      name: 'OpenAI GPT',
      description: 'OpenAI\'s powerful language models including GPT-4',
      icon: '🤖',
      features: ['Creative responses', 'Code generation', 'Wide knowledge base']
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      description: 'Anthropic\'s helpful, harmless, and honest AI assistant',
      icon: '🎭',
      features: ['Safe responses', 'Long context', 'Analytical thinking']
    },
    {
      id: 'local',
      name: 'Local LLM',
      description: 'Use a locally hosted language model for privacy',
      icon: '🏠',
      features: ['Privacy focused', 'No API costs', 'Full control']
    }
  ];

  // PUBLIC_INTERFACE
  const handleSettingChange = (setting, value) => {
    /**
     * Updates LLM configuration setting
     * @param {string} setting - Setting name to update
     * @param {number} value - New setting value
     */
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // PUBLIC_INTERFACE
  const resetToDefaults = () => {
    /**
     * Resets all settings to default values
     */
    setSettings({
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0
    });
  };

  // PUBLIC_INTERFACE
  const saveSettings = () => {
    /**
     * Saves current settings configuration
     */
    console.log('Saving LLM settings:', settings);
    // Implementation would save to backend or local storage
  };

  return (
    <div className="llm-settings">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        {/* Provider Selection */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">LLM Provider</h2>
            <p className="card-description">
              Select your preferred language model provider
            </p>
          </div>
          
          <div className="card-content">
            <div className="provider-list">
              {llmProviders.map((provider) => (
                <div 
                  key={provider.id}
                  className={`provider-item ${selectedLLM === provider.id ? 'selected' : ''}`}
                  style={{
                    padding: 'var(--space-4)',
                    border: `2px solid ${selectedLLM === provider.id ? 'var(--color-primary-600)' : 'var(--border-primary)'}`,
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-3)',
                    cursor: 'pointer',
                    transition: 'var(--transition-colors)',
                    backgroundColor: selectedLLM === provider.id ? 'var(--color-primary-50)' : 'transparent'
                  }}
                  onClick={() => onLLMChange(provider.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: '24px' }}>{provider.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-1)' }}>
                        {provider.name}
                      </h3>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                        {provider.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        {provider.features.map((feature, index) => (
                          <span 
                            key={index}
                            style={{
                              fontSize: 'var(--font-size-xs)',
                              padding: 'var(--space-1) var(--space-2)',
                              backgroundColor: 'var(--bg-secondary)',
                              color: 'var(--text-secondary)',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Model Parameters */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Model Parameters</h2>
            <p className="card-description">
              Fine-tune the behavior of your selected LLM
            </p>
          </div>
          
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="temperature" className="form-label">
                Temperature: {settings.temperature}
              </label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div className="form-help">
                Controls randomness. Lower values make output more focused and deterministic.
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="maxTokens" className="form-label">
                Max Tokens: {settings.maxTokens}
              </label>
              <input
                id="maxTokens"
                type="range"
                min="256"
                max="4096"
                step="256"
                value={settings.maxTokens}
                onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div className="form-help">
                Maximum number of tokens to generate in the response.
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="topP" className="form-label">
                Top P: {settings.topP}
              </label>
              <input
                id="topP"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.topP}
                onChange={(e) => handleSettingChange('topP', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div className="form-help">
                Controls diversity via nucleus sampling. Lower values focus on top choices.
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="frequencyPenalty" className="form-label">
                Frequency Penalty: {settings.frequencyPenalty}
              </label>
              <input
                id="frequencyPenalty"
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={settings.frequencyPenalty}
                onChange={(e) => handleSettingChange('frequencyPenalty', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div className="form-help">
                Reduces repetition. Positive values discourage repeated tokens.
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="presencePenalty" className="form-label">
                Presence Penalty: {settings.presencePenalty}
              </label>
              <input
                id="presencePenalty"
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={settings.presencePenalty}
                onChange={(e) => handleSettingChange('presencePenalty', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div className="form-help">
                Encourages new topics. Positive values promote diverse content.
              </div>
            </div>
          </div>
          
          <div className="card-footer">
            <button className="btn btn-outline" onClick={resetToDefaults}>
              Reset to Defaults
            </button>
            <button className="btn btn-primary" onClick={saveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LLMSettings;
