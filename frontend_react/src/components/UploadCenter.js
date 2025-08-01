import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// PUBLIC_INTERFACE
function UploadCenter() {
  /**
   * Upload center component with drag-and-drop file upload functionality
   * Supports OpenAPI specs, JSON samples, and Postman collections
   */
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // PUBLIC_INTERFACE
  const onDrop = useCallback(async (acceptedFiles) => {
    /**
     * Handles file drop and upload processing
     * @param {File[]} acceptedFiles - Array of dropped files
     */
    setUploading(true);
    
    try {
      const newFiles = acceptedFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        file: file
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Simulate upload process
      for (const fileInfo of newFiles) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileInfo.id 
              ? { ...f, status: 'completed' }
              : f
          )
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'application/yaml': ['.yaml', '.yml'],
      'text/plain': ['.txt']
    },
    multiple: true
  });

  // PUBLIC_INTERFACE
  const removeFile = (fileId) => {
    /**
     * Removes uploaded file from the list
     * @param {string} fileId - ID of file to remove
     */
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // PUBLIC_INTERFACE
  const formatFileSize = (bytes) => {
    /**
     * Formats file size in human-readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="upload-center">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Upload API Documentation</h2>
          <p className="card-description">
            Upload OpenAPI specifications, JSON samples, or Postman collections 
            to power your mock API responses
          </p>
        </div>
        
        <div className="card-content">
          <div 
            {...getRootProps()} 
            className={`dropzone ${isDragActive ? 'active' : ''}`}
            style={{
              border: '2px dashed var(--border-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              textAlign: 'center',
              backgroundColor: isDragActive ? 'var(--bg-secondary)' : 'transparent',
              cursor: 'pointer',
              transition: 'var(--transition-colors)'
            }}
          >
            <input {...getInputProps()} />
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>
              📁
            </div>
            {isDragActive ? (
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)' }}>
                Drop the files here...
              </p>
            ) : (
              <div>
                <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                  Drag & drop files here, or click to select
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  Supports: OpenAPI (JSON/YAML), Postman Collections, JSON samples
                </p>
              </div>
            )}
          </div>
          
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-lg)' }}>
                Uploaded Files
              </h3>
              <div className="file-list">
                {uploadedFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="file-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-3)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span style={{ fontSize: '20px' }}>
                        {file.status === 'uploading' ? '⏳' : '✅'}
                      </span>
                      <div>
                        <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                          {formatFileSize(file.size)} • {file.status}
                        </div>
                      </div>
                    </div>
                    {file.status === 'completed' && (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: 'var(--space-1)' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="card-footer">
            <button className="btn btn-outline">
              Clear All
            </button>
            <button className="btn btn-primary" disabled={uploading}>
              {uploading ? (
                <>
                  <span className="loading-spinner"></span>
                  Processing...
                </>
              ) : (
                'Process Files'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadCenter;
