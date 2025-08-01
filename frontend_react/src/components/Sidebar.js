import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
function Sidebar({ collapsed, onToggle }) {
  /**
   * Sidebar navigation component with collapsible functionality
   * Provides navigation links for all main application sections
   * 
   * @param {boolean} collapsed - Whether sidebar is collapsed
   * @param {function} onToggle - Function to toggle sidebar state
   */
  const location = useLocation();

  const navigationItems = [
    {
      path: '/',
      label: 'Mock Interface',
      icon: '🔧',
      description: 'Test API requests'
    },
    {
      path: '/upload',
      label: 'Upload Center',
      icon: '📁',
      description: 'Upload API documentation'
    },
    {
      path: '/reports',
      label: 'Reports Viewer',
      icon: '📊',
      description: 'View validation reports'
    },
    {
      path: '/llm-settings',
      label: 'LLM Settings',
      icon: '⚙️',
      description: 'Configure LLM providers'
    },
    {
      path: '/api-keys',
      label: 'API Keys',
      icon: '🔑',
      description: 'Manage API keys'
    },
    {
      path: '/chat-history',
      label: 'Chat History',
      icon: '💬',
      description: 'View conversation history'
    }
  ];

  // PUBLIC_INTERFACE
  const isActiveRoute = (path) => {
    /**
     * Checks if the current route matches the given path
     * @param {string} path - Route path to check
     * @returns {boolean} Whether route is active
     */
    return location.pathname === path;
  };

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          IM
        </div>
        <h1 className="sidebar-title">IntelliMock</h1>
      </div>
      
      <ul className="sidebar-nav">
        {navigationItems.map((item) => (
          <li key={item.path} className="sidebar-nav-item">
            <Link
              to={item.path}
              className={`sidebar-nav-link ${isActiveRoute(item.path) ? 'active' : ''}`}
              title={collapsed ? `${item.label} - ${item.description}` : undefined}
            >
              <span className="sidebar-nav-icon" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className="sidebar-nav-text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
