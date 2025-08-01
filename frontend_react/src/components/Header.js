import React from 'react';
import { useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
function Header({ theme, onThemeToggle, selectedLLM, onLLMChange, onSidebarToggle }) {
  /**
   * Header component with theme toggle, LLM selection, and page title
   * Provides top-level navigation controls and contextual information
   * 
   * @param {string} theme - Current theme (light/dark)
   * @param {function} onThemeToggle - Function to toggle theme
   * @param {string} selectedLLM - Currently selected LLM provider
   * @param {function} onLLMChange - Function to change LLM provider
   * @param {function} onSidebarToggle - Function to toggle sidebar on mobile
   */
  const location = useLocation();

  // PUBLIC_INTERFACE
  const getPageTitle = () => {
    /**
     * Returns the current page title based on route
     * @returns {string} Page title
     */
    const routeTitles = {
      '/': 'Mock Interface',
      '/upload': 'Upload Center',
      '/reports': 'Reports Viewer',
      '/llm-settings': 'LLM Settings',
      '/api-keys': 'API Key Manager',
      '/chat-history': 'Chat History'
    };
    return routeTitles[location.pathname] || 'IntelliMock';
  };

  // PUBLIC_INTERFACE
  const handleLLMSelect = (event) => {
    /**
     * Handles LLM provider selection change
     * @param {Event} event - Select change event
     */
    onLLMChange(event.target.value);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      
      <div className="header-right">
        <div className="header-controls">
          <div className="form-group">
            <label htmlFor="llm-select" className="sr-only">
              Select LLM Provider
            </label>
            <select
              id="llm-select"
              className="form-select"
              value={selectedLLM}
              onChange={handleLLMSelect}
              style={{ minWidth: '120px' }}
            >
              <option value="gemini">Gemini</option>
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
              <option value="local">Local LLM</option>
            </select>
          </div>
          
          <button 
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span role="img" aria-hidden="true">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          
          <button className="btn btn-primary btn-sm">
            Export
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
