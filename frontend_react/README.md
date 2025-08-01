# IntelliMock React Frontend

A comprehensive React frontend for the IntelliMock API response assistant, featuring a modern dashboard interface with professional blue-to-purple gradient theming based on the EVP Teams Backdrop design.

## 🚀 Features

### Core Layout Components
- **Responsive Dashboard**: Modern sidebar navigation with collapsible functionality
- **Professional Header**: Theme toggle, LLM provider selection, and contextual controls
- **Adaptive Layout**: Mobile-first responsive design with smooth transitions

### Key Modules
- **📁 Upload Center**: Drag-and-drop file upload for OpenAPI specs, JSON samples, and Postman collections
- **🔧 Mock Interface**: Interactive API request builder with real-time response display
- **📊 Reports Viewer**: Comprehensive validation report viewing with export capabilities (PDF, JSON, Excel)
- **⚙️ LLM Settings**: Advanced configuration for language model providers with parameter tuning
- **🔑 API Key Manager**: Secure in-browser API key storage and management
- **💬 Chat History**: Conversation history management with search and export functionality

### Design System
- **EVP Teams Backdrop Theme**: Professional blue-to-purple gradient design
- **Comprehensive Design Tokens**: Consistent color palette, typography, spacing, and component styling
- **Dark/Light Mode**: Complete theme switching with smooth transitions
- **Accessibility**: WCAG compliant with proper focus management and keyboard navigation

## 🛠 Technology Stack

- **React 18.2.0**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing for single-page application
- **React Dropzone**: File upload with drag-and-drop functionality
- **Axios**: HTTP client for API communication
- **CSS Custom Properties**: Design system implementation with CSS variables
- **Modern CSS Features**: Grid, Flexbox, custom properties, and responsive design

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🎨 Design System

### Color Palette
```css
/* Primary Brand Colors */
--color-primary-900: #1e3a8a;      /* Deep Blue */
--color-purple-700: #7c3aed;       /* Primary Purple */
--color-accent-gold-400: #fbbf24;  /* Gold Accent */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
```

### Typography
- **Font Family**: Inter, Helvetica Neue, system fonts
- **Type Scale**: 12px - 60px with consistent line heights
- **Font Weights**: 300 (light) - 900 (black)

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px - 384px with consistent increments
- **Component Spacing**: Standardized padding and margins

## 🏗 Architecture

### Component Structure
```
src/
├── components/
│   ├── Sidebar.js              # Navigation sidebar
│   ├── Header.js               # Top header with controls
│   ├── MainContent.js          # Content wrapper
│   ├── UploadCenter.js         # File upload interface
│   ├── MockInterface.js        # API testing interface
│   ├── ReportsViewer.js        # Report viewing and export
│   ├── LLMSettings.js          # LLM configuration
│   ├── ApiKeyManager.js        # API key management
│   └── ChatHistory.js          # Conversation history
├── design-tokens.css           # Design system tokens
├── App.js                      # Main application component
├── App.css                     # Global styles and theme
└── index.js                    # Application entry point
```

### Routing Structure
- `/` - Mock Interface (default)
- `/upload` - Upload Center
- `/reports` - Reports Viewer
- `/llm-settings` - LLM Settings
- `/api-keys` - API Key Manager
- `/chat-history` - Chat History

## 🔧 Configuration

### Environment Variables
The application supports the following environment variables:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_SITE_URL=http://localhost:3000
```

### LLM Providers
Supported LLM providers:
- **Google Gemini**: Primary recommendation
- **OpenAI GPT**: GPT-3.5/4 models
- **Anthropic Claude**: Claude models
- **Local LLM**: Self-hosted models

## 🔐 Security Features

### API Key Management
- **Local Storage**: Keys stored securely in browser localStorage
- **No Server Transmission**: Keys never sent to IntelliMock servers
- **Direct Provider Communication**: Keys used only for LLM provider APIs
- **Visibility Toggle**: Secure key display with masking
- **Easy Removal**: One-click key deletion

### Data Privacy
- **Client-Side Processing**: Sensitive data processed locally
- **Secure Headers**: HTTPS-only cookie settings
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Content sanitization

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Collapsible Sidebar**: Touch-friendly navigation
- **Adaptive Header**: Responsive control layout
- **Touch Targets**: Minimum 44px touch areas
- **Optimized Forms**: Mobile-friendly inputs

## 🎯 Accessibility

### WCAG Compliance
- **Color Contrast**: 4.5:1 ratio for normal text, 3:1 for large text
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user motion preferences

### Implementation Details
- **Skip Links**: Quick navigation to main content
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alternatives
- **Form Labels**: Associated labels for all inputs

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Route-based code splitting with React.lazy
- **CSS Optimization**: Purged unused styles in production
- **Image Optimization**: Responsive images with proper formats
- **Bundle Analysis**: Webpack bundle analyzer integration

### Loading States
- **Skeleton Loading**: Content placeholders during load
- **Progress Indicators**: Upload and processing feedback
- **Error Boundaries**: Graceful error handling
- **Retry Logic**: Automatic retry for failed requests

## 🧪 Testing

### Test Coverage
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Testing Strategy
- **Component Tests**: Individual component functionality
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: Automated a11y testing
- **Visual Tests**: Screenshot comparison testing

## 📚 API Integration

### Backend Communication
The frontend integrates with the FastAPI backend through RESTful endpoints:

```javascript
// Example API call structure
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return await axios.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
```

### Real-time Features
- **WebSocket Support**: Real-time response updates
- **Progress Tracking**: Upload and processing progress
- **Live Validation**: Instant feedback on form inputs
- **Auto-save**: Automatic saving of user preferences

## 🔄 State Management

### Component State
- **React Hooks**: useState, useEffect for local state
- **Context API**: Global state for theme and user preferences
- **Local Storage**: Persistent storage for user settings
- **Session Storage**: Temporary data for current session

### Data Flow
- **Unidirectional Flow**: Props down, events up
- **Immutable Updates**: Proper state update patterns
- **Error Boundaries**: Centralized error handling
- **Loading States**: Consistent loading indicators

## 🎨 Theming

### Theme System
```javascript
// Theme toggle implementation
const toggleTheme = () => {
  setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
};
```

### Custom Properties
- **CSS Variables**: Comprehensive design token system
- **Theme Variants**: Light and dark theme support
- **Dynamic Updates**: Real-time theme switching
- **Consistent Application**: Automated theme propagation

## 📖 Usage Examples

### File Upload
```javascript
// Drag and drop file upload
const onDrop = useCallback(async (acceptedFiles) => {
  const uploadPromises = acceptedFiles.map(file => uploadFile(file));
  const results = await Promise.all(uploadPromises);
  updateFileList(results);
}, []);
```

### API Request Testing
```javascript
// Mock API request
const sendRequest = async () => {
  const response = await axios({
    method: request.method,
    url: request.url,
    headers: JSON.parse(request.headers),
    data: request.body
  });
  setResponse(response);
};
```

## 🛠 Development

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open http://localhost:3000 (or assigned port)

### Development Workflow
- **Hot Reload**: Automatic browser refresh on file changes
- **ESLint**: Code quality and consistency checking
- **Prettier**: Automatic code formatting
- **Git Hooks**: Pre-commit linting and testing

### Build Process
```bash
# Development build with source maps
npm start

# Production build with optimization
npm run build

# Serve production build locally
npx serve -s build
```

## 🚀 Deployment

### Build Configuration
- **Environment Variables**: Production-specific settings
- **Asset Optimization**: Minification and compression
- **Bundle Splitting**: Code splitting for optimal loading
- **Static Assets**: Optimized images and fonts

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN Integration**: CloudFront, CloudFlare
- **Container Deployment**: Docker with Nginx
- **Traditional Hosting**: Apache, Nginx static serving

## 📄 License

This project is part of the IntelliMock application suite. See the main project repository for licensing information.

## 🤝 Contributing

Please refer to the main IntelliMock project for contribution guidelines and development standards.

---

**IntelliMock Frontend** - Professional API response assistant with intelligent RAG-powered mock generation and validation.
