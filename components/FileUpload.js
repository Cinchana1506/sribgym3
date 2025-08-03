import React, { useRef, useState } from 'react';

const pdfIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
    <rect width="24" height="24" rx="4" fill="#F44336"/>
    <text x="50%" y="60%" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial">PDF</text>
  </svg>
);

const trashIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 12, cursor: 'pointer', flexShrink: 0 }}>
    <rect width="24" height="24" rx="4" fill="#fff"/>
    <path d="M9 9l6 6M15 9l-6 6" stroke="#F44336" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const cloudUploadIcon = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
    <path d="M20.5 18.5C22.9853 18.5 25 16.4853 25 14C25 11.5147 22.9853 9.5 20.5 9.5C20.5 7.01472 18.4853 5 16 5C13.5147 5 11.5 7.01472 11.5 9.5C9.01472 9.5 7 11.5147 7 14C7 16.4853 9.01472 18.5 11.5 18.5H20.5Z" stroke="#1976d2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 12V17M16 17L13.5 14.5M16 17L18.5 14.5" stroke="#1976d2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileUpload = ({ state, activity, attachedFile, onAttach, onRemove }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  if (activity !== 'Gym' && activity !== 'Group Exercise') return null;

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf' && f.size <= 3 * 1024 * 1024) {
      setSelectedFile({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1),
        date: new Date().toLocaleString(),
        file: f,
        url: URL.createObjectURL(f),
      });
    } else {
      setSelectedFile(null);
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const handleAttachClick = () => {
    if (selectedFile && onAttach) {
      onAttach(selectedFile);
      setSelectedFile(null);
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <section style={{ background: 'none', border: 'none', borderRadius: 0, padding: 0, margin: '24px 0 0 0', minWidth: 320, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>
      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14, color: '#202224', fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif" }}>Fitness Certificate</div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px dashed #D0D5DD',
        borderRadius: 10,
        padding: '12px 20px',
        background: '#FAFBFB',
        gap: 24,
        minHeight: 56,
        width: '100%',
        marginTop: 8,
        fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
      }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 18px',
            borderRadius: 8,
            background: '#fff',
            color: '#202224',
            border: '1.5px solid #D0D5DD',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
            boxShadow: '0 1px 2px #f0f0f0',
            minWidth: 170,
          }}
          onClick={handleChooseFileClick}
        >
          <span style={{ marginRight: 8 }}>{cloudUploadIcon}</span>
          <span>Choose a File</span>
        </button>
        <span style={{ color: '#4B5563', fontSize: 14, fontWeight: 400, fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif", marginLeft: 0 }}>
          PDF format <span style={{ color: '#98A2B3', margin: '0 6px' }}>•</span> Max. 3MB
        </span>
        <button
          type="button"
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            background: selectedFile ? '#38AEE0' : '#fff',
            color: selectedFile ? '#fff' : '#38AEE0',
            border: '1.5px solid #38AEE0',
            fontWeight: 700,
            fontSize: 15,
            marginLeft: 0,
            cursor: selectedFile ? 'pointer' : 'not-allowed',
            opacity: selectedFile ? 1 : 0.6,
            transition: 'all 0.2s',
            fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
          }}
          onClick={handleAttachClick}
          disabled={!selectedFile}
        >
          Attach
        </button>
        {/* Right: Attached file card */}
        {attachedFile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            border: '1.5px solid #e3e8ee',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 15,
            marginLeft: 24,
            minWidth: 220,
            maxWidth: 340,
            boxShadow: '0 1px 2px #f0f0f0',
            gap: 8,
          }}>
            {pdfIcon}
            <span style={{ fontWeight: 500, marginRight: 8 }}>{attachedFile.name}</span>
            <span style={{ color: '#888', fontSize: 13, marginRight: 8 }}>{attachedFile.date} • {attachedFile.size}MB</span>
            <span 
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
              onClick={handleRemoveFile}
              title="Remove file"
            >
              {trashIcon}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FileUpload; 