import React from 'react';

// PUBLIC_INTERFACE
function MainContent({ children }) {
  /**
   * Main content wrapper component that provides consistent layout
   * and spacing for all page content
   * 
   * @param {React.ReactNode} children - Child components to render
   */
  return (
    <main className="main-content">
      {children}
    </main>
  );
}

export default MainContent;
