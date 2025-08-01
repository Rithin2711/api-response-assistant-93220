import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import UploadCenter from './components/UploadCenter';
import MockInterface from './components/MockInterface';
import ReportsViewer from './components/ReportsViewer';
import LLMSettings from './components/LLMSettings';
import ApiKeyManager from './components/ApiKeyManager';
import ChatHistory from './components/ChatHistory';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component that provides routing and layout structure
   * for the IntelliMock dashboard interface
   */
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState('gemini');
  const [apiKeys, setApiKeys] = useState({});

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /**
     * Toggles between light and dark theme modes
     */
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const toggleSidebar = () => {
    /**
     * Toggles the sidebar collapsed state for mobile responsiveness
     */
    setSidebarCollapsed(prev => !prev);
  };

  // PUBLIC_INTERFACE
  const handleLLMChange = (llmProvider) => {
    /**
     * Updates the selected LLM provider
     * @param {string} llmProvider - The selected LLM provider
     */
    setSelectedLLM(llmProvider);
  };

  // PUBLIC_INTERFACE
  const handleApiKeyUpdate = (provider, key) => {
    /**
     * Updates API key for specified provider
     * @param {string} provider - The LLM provider
     * @param {string} key - The API key
     */
    setApiKeys(prev => ({
      ...prev,
      [provider]: key
    }));
  };

  return (
    <Router>
      <div className="app">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
        <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header 
            theme={theme}
            onThemeToggle={toggleTheme}
            selectedLLM={selectedLLM}
            onLLMChange={handleLLMChange}
            onSidebarToggle={toggleSidebar}
          />
          <MainContent>
            <Routes>
              <Route path="/" element={<MockInterface />} />
              <Route path="/upload" element={<UploadCenter />} />
              <Route path="/reports" element={<ReportsViewer />} />
              <Route path="/llm-settings" element={
                <LLMSettings 
                  selectedLLM={selectedLLM}
                  onLLMChange={handleLLMChange}
                />
              } />
              <Route path="/api-keys" element={
                <ApiKeyManager 
                  apiKeys={apiKeys}
                  onApiKeyUpdate={handleApiKeyUpdate}
                />
              } />
              <Route path="/chat-history" element={<ChatHistory />} />
            </Routes>
          </MainContent>
        </div>
      </div>
    </Router>
  );
}

export default App;
