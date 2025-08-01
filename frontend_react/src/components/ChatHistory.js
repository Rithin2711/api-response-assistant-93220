import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
function ChatHistory() {
  /**
   * Chat history component for viewing and managing conversation history
   * Displays past interactions with the LLM for API validation and generation
   */
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  // PUBLIC_INTERFACE
  const loadConversations = async () => {
    /**
     * Loads conversation history from storage
     */
    setLoading(true);
    try {
      // Mock conversation data
      const mockConversations = [
        {
          id: '1',
          title: 'User API Validation',
          date: '2024-01-15T14:30:00Z',
          messageCount: 8,
          llmProvider: 'gemini',
          status: 'completed',
          preview: 'Generated mock responses for user management endpoints...'
        },
        {
          id: '2',
          title: 'Order Management Schema',
          date: '2024-01-15T11:45:00Z',
          messageCount: 12,
          llmProvider: 'openai',
          status: 'completed',
          preview: 'Validated order creation and retrieval endpoints...'
        },
        {
          id: '3',
          title: 'Authentication Flow Testing',
          date: '2024-01-14T16:20:00Z',
          messageCount: 6,
          llmProvider: 'claude',
          status: 'completed',
          preview: 'Tested login, logout, and token refresh scenarios...'
        }
      ];
      
      setConversations(mockConversations);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const viewConversation = (conversation) => {
    /**
     * Views detailed conversation messages
     * @param {Object} conversation - Conversation to view
     */
    const mockMessages = [
      {
        id: '1',
        type: 'user',
        content: 'Please generate mock responses for a user management API based on this OpenAPI specification.',
        timestamp: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        type: 'assistant',
        content: 'I\'ll help you generate mock responses for your user management API. Based on the OpenAPI specification, I can see endpoints for creating, reading, updating, and deleting users. Let me create realistic mock data for each endpoint.',
        timestamp: '2024-01-15T14:30:15Z'
      },
      {
        id: '3',
        type: 'user',
        content: 'Focus on the GET /users endpoint first. I need realistic user data with proper validation.',
        timestamp: '2024-01-15T14:31:00Z'
      },
      {
        id: '4',
        type: 'assistant',
        content: `Here's a mock response for GET /users:

\`\`\`json
{
  "users": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john.doe@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "created_at": "2024-01-10T10:30:00Z",
      "is_active": true
    },
    {
      "id": 2,
      "username": "jane_smith",
      "email": "jane.smith@example.com",
      "first_name": "Jane",
      "last_name": "Smith",  
      "created_at": "2024-01-12T15:45:00Z",
      "is_active": true
    }
  ],
  "total": 2,
  "page": 1,
  "per_page": 10
}
\`\`\`

This response includes proper pagination metadata and follows RESTful conventions.`,
        timestamp: '2024-01-15T14:31:30Z'
      }
    ];
    
    setSelectedConversation({ ...conversation, messages: mockMessages });
  };

  // PUBLIC_INTERFACE
  const deleteConversation = (conversationId) => {
    /**
     * Deletes a conversation from history
     * @param {string} conversationId - ID of conversation to delete
     */
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (selectedConversation && selectedConversation.id === conversationId) {
        setSelectedConversation(null);
      }
    }
  };

  // PUBLIC_INTERFACE
  const exportConversation = (conversation) => {
    /**
     * Exports conversation to JSON file
     * @param {Object} conversation - Conversation to export
     */
    const dataStr = JSON.stringify(conversation, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `conversation-${conversation.id}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // PUBLIC_INTERFACE
  const formatDate = (dateString) => {
    /**
     * Formats date for display
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date
     */
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // PUBLIC_INTERFACE
  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedConversation) {
    return (
      <div className="chat-history">
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 className="card-title">{selectedConversation.title}</h2>
                <p className="card-description">
                  {formatDate(selectedConversation.date)} • {selectedConversation.messageCount} messages • {selectedConversation.llmProvider}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => exportConversation(selectedConversation)}
                >
                  Export
                </button>
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSelectedConversation(null)}
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
          
          <div className="card-content">
            <div className="conversation-messages" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {selectedConversation.messages?.map((message) => (
                <div 
                  key={message.id}
                  className={`message ${message.type}`}
                  style={{
                    display: 'flex',
                    marginBottom: 'var(--space-4)',
                    gap: 'var(--space-3)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: message.type === 'user' ? 'var(--color-primary-600)' : 'var(--color-accent-gold-400)',
                    color: message.type === 'user' ? 'white' : 'var(--color-gray-900)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    flexShrink: 0
                  }}>
                    {message.type === 'user' ? 'U' : 'AI'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      backgroundColor: message.type === 'user' ? 'var(--color-primary-50)' : 'var(--bg-secondary)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-1)'
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 'var(--line-height-relaxed)' }}>
                        {message.content}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: 'var(--font-size-xs)', 
                      color: 'var(--text-tertiary)',
                      textAlign: message.type === 'user' ? 'right' : 'left'
                    }}>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-history">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Conversation History</h2>
          <p className="card-description">
            View and manage your past conversations with the AI assistant
          </p>
        </div>
        
        <div className="card-content">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div className="loading-spinner" style={{ width: '32px', height: '32px' }}></div>
              <p style={{ marginTop: 'var(--space-4)' }}>Loading conversations...</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>💬</div>
              <p>{searchTerm ? 'No conversations match your search' : 'No conversations yet'}</p>
              <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                {searchTerm ? 'Try a different search term' : 'Start using the mock interface to create conversations'}
              </p>
            </div>
          ) : (
            <div className="conversations-list">
              {filteredConversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className="conversation-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-3)',
                    cursor: 'pointer',
                    transition: 'var(--transition-shadow)'
                  }}
                  onClick={() => viewConversation(conversation)}
                  onMouseEnter={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-1)' }}>
                      {conversation.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                      {conversation.preview}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                      <span>{formatDate(conversation.date)}</span>
                      <span>•</span>
                      <span>{conversation.messageCount} messages</span>
                      <span>•</span>
                      <span>{conversation.llmProvider}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        exportConversation(conversation);
                      }}
                    >
                      Export
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      style={{ color: 'var(--color-error-600)' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
