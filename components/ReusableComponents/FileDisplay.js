import React from 'react';
import { BsDownload } from 'react-icons/bs';

const FileDisplay = ({ 
  fileName = "Fitness Certificate.pdf",
  fileSize = "13MB",
  uploadDate = "11 Sep, 2023 • 12:24pm",
  onDownload,
  style = {}
}) => {
  const pdfIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
      <rect width="24" height="24" rx="4" fill="#F44336"/>
      <text x="50%" y="60%" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">PDF</text>
    </svg>
  );

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      border: '1.5px solid #e3e8ee',
      borderRadius: 8,
      padding: '12px 16px',
      fontSize: 15,
      minWidth: 220,
      maxWidth: 340,
      boxShadow: '0 1px 2px #f0f0f0',
      gap: 8,
      ...style
    }}>
      {pdfIcon}
      <span style={{ fontWeight: 500, marginRight: 8 }}>{fileName}</span>
      <span style={{ color: '#888', fontSize: 12, marginRight: 8 }}>{uploadDate} • {fileSize}</span>
      <BsDownload 
        size={50} 
        color="#f44336" 
        style={{ cursor: 'pointer', strokeWidth: 0.5 }} 
        onClick={onDownload}
      />
    </div>
  );
};

export default FileDisplay; 