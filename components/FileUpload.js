import React, { useRef, useState } from 'react';

const pdfIcon = (<img src="/pdf.png" alt="PDF" className="pdf-icon" />);

const trashIcon = (<img src="/dustbin.png" alt="Remove" className="trash-icon" />);

const cloudUploadIcon = (<img src="/up.png" alt="Upload" className="choose-file-icon" />);

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
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px dashed #D0D5DD',
        borderRadius: 10,
        padding: '16px',
        background: '#FAFBFB',
        minHeight: 80,
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
        
        {/* Button row with attached card positioned in mid-gap */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              type="button"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: 8,
                background: '#fff',
                color: '#202224',
                border: '1.5px solid #D0D5DD',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
                boxShadow: '0 1px 2px #f0f0f0',
                minWidth: 220,
              }}
              onClick={handleChooseFileClick}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{cloudUploadIcon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 8, alignItems: 'flex-start' }}>
                  <span style={{ 
                    fontSize: 15, 
                    fontWeight: 700, 
                    color: '#202224',
                    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
                  }}>
                    Choose a File
                  </span>
                  <span style={{ 
                    color: '#4B5563', 
                    fontSize: 12, 
                    fontWeight: 400, 
                    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
                  }}>
                    PDF format <span style={{ color: '#98A2B3', margin: '0 4px' }}>•</span> Max. 3MB
                  </span>
                </div>
              </div>
            </button>
            
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
          </div>

          {attachedFile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              border: '1.5px solid #e3e8ee',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 15,
              marginLeft: 96,
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
      </div>
    </section>
  );
};

export default FileUpload; 