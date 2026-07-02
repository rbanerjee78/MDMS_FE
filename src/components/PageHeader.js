import React from 'react';
import { exportToCSV } from '../utils/exportUtils';

const PageHeader = ({ title, subtitle, breadcrumbItem, exportData, exportFilename }) => {
  const handleExport = () => {
    if (exportData && exportData.length > 0) {
      exportToCSV(exportData, exportFilename || title.replace(/\s+/g, '_').toLowerCase());
    } else {
      alert("No data available to export");
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-1" style={{ fontSize: '12px' }}>
            <li className="breadcrumb-item text-muted">Home</li>
            <li className="breadcrumb-item text-dark fw-bold" aria-current="page">{breadcrumbItem || title}</li>
          </ol>
        </nav>
        <h2 className="fw-bold mb-1">{title}</h2>
        <p className="text-muted mb-0" style={{ fontSize: '13px' }}>{subtitle || 'Manage and view details for this section'}</p>
      </div>
      <div className="d-flex space-x-3 gap-2">
        <button 
          className="btn btn-light rounded-pill px-4 py-2 shadow-sm border-0" 
          style={{ fontSize: '13px', fontWeight: '500' }}
          onClick={handleExport}
        >
          Export report
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
