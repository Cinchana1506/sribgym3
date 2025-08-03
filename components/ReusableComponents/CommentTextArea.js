import React from 'react';

const CommentTextArea = ({ 
  value, 
  onChange, 
  placeholder = "xxx-xx-xxx-xx-xxx",
  maxLength = 500,
  label = "Comment (Max 500 Chars)",
  style = {}
}) => {
  const textareaStyle = {
    width: '100%',
    minHeight: 80,
    borderRadius: 6,
    border: '1px solid #D0D5DD',
    padding: '12px 16px',
    fontSize: 14,
    color: '#202224',
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif",
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
    ...style
  };

  const labelStyle = {
    fontWeight: 700,
    fontSize: 14,
    color: '#202224',
    marginBottom: 8,
    fontFamily: "'Samsung InterFace', 'Inter', Arial, sans-serif"
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={labelStyle}>{label}</div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        style={textareaStyle}
      />
    </div>
  );
};

export default CommentTextArea; 