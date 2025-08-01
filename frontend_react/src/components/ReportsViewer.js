import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
function ReportsViewer() {
  /**
   * Reports viewer component for displaying validation reports
   * Supports PDF, JSON, and Excel export formats
   */
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  // PUBLIC_INTERFACE
  const loadReports = async () => {
    /**
     * Loads available validation reports
     */
    setLoading(true);
    try {
      // Mock reports data
      const mockReports = [
        {
          id: '1',
          name: 'User API Validation',
          date: '2024-01-15T10:30:00Z',
          status: 'completed',
          type: 'validation',
          requests: 25,
          passed: 23,
          failed: 2
        },
        {
          id: '2',
          name: 'Order Management API',
          date: '2024-01-14T15:45:00Z',
          status: 'completed',
          type: 'validation',
          requests: 42,
          passed: 38,
          failed: 4
        },
        {
          id: '3',
          name: 'Authentication Flow',
          date: '2024-01-13T09:15:00Z',
          status: 'completed',
          type: 'validation',
          requests: 15,
          passed: 15,
          failed: 0
        }
      ];
      
      setReports(mockReports);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const viewReport = (report) => {
    /**
     * Displays detailed view of selected report
     * @param {Object} report - Report to view
     */
    setSelectedReport(report);
  };

  // PUBLIC_INTERFACE
  const downloadReport = (reportId, format) => {
    /**
     * Downloads report in specified format
     * @param {string} reportId - ID of report to download
     * @param {string} format - Export format (pdf, json, excel)
     */
    console.log(`Downloading report ${reportId} as ${format}`);
    // Implementation would handle actual download
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

  if (selectedReport) {
    return (
      <div className="reports-viewer">
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 className="card-title">{selectedReport.name}</h2>
                <p className="card-description">
                  Generated on {formatDate(selectedReport.date)}
                </p>
              </div>
              <button 
                className="btn btn-outline"
                onClick={() => setSelectedReport(null)}
              >
                ← Back to Reports
              </button>
            </div>
          </div>
          
          <div className="card-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div style={{ textAlign: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-600)' }}>
                  {selectedReport.requests}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  Total Requests
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-success-600)' }}>
                  {selectedReport.passed}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  Passed
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-error-600)' }}>
                  {selectedReport.failed}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  Failed
                </div>
              </div>
            </div>
            
            <div>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Validation Results</h3>
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                <pre style={{ fontSize: 'var(--font-size-sm)', overflow: 'auto' }}>
{`{
  "summary": {
    "total_requests": ${selectedReport.requests},
    "passed": ${selectedReport.passed},
    "failed": ${selectedReport.failed},
    "success_rate": "${Math.round((selectedReport.passed / selectedReport.requests) * 100)}%"
  },
  "details": {
    "endpoints": [
      {
        "path": "/api/users",
        "method": "GET",
        "status": "passed",
        "response_time": "120ms",
        "validation": "Schema matches documentation"
      },
      {
        "path": "/api/users",
        "method": "POST",
        "status": "failed",
        "response_time": "85ms",
        "validation": "Missing required field: email"
      }
    ]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="card-footer">
            <button 
              className="btn btn-outline"
              onClick={() => downloadReport(selectedReport.id, 'json')}
            >
              Download JSON
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => downloadReport(selectedReport.id, 'excel')}
            >
              Download Excel
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => downloadReport(selectedReport.id, 'pdf')}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-viewer">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Validation Reports</h2>
          <p className="card-description">
            View and download validation reports for your API tests
          </p>
        </div>
        
        <div className="card-content">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div className="loading-spinner" style={{ width: '32px', height: '32px' }}></div>
              <p style={{ marginTop: 'var(--space-4)' }}>Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>📊</div>
              <p>No reports available yet</p>
              <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                Run some API validations to generate reports
              </p>
            </div>
          ) : (
            <div className="reports-list">
              {reports.map((report) => (
                <div 
                  key={report.id}
                  className="report-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-3)',
                    transition: 'var(--transition-shadow)'
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                >
                  <div>
                    <h3 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-1)' }}>
                      {report.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                      <span>{formatDate(report.date)}</span>
                      <span>•</span>
                      <span>{report.requests} requests</span>
                      <span>•</span>
                      <span style={{ color: report.failed === 0 ? 'var(--color-success-600)' : 'var(--color-warning-600)' }}>
                        {report.passed}/{report.requests} passed
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => viewReport(report)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => downloadReport(report.id, 'pdf')}
                    >
                      Download
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

export default ReportsViewer;
