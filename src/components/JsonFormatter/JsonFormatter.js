import React, { useState, useEffect } from 'react';
import './JsonFormatter.css';

const JsonFormatter = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState({ success: false, message: '' });
  const [searchText, setSearchText] = useState('');
  const [highlightedContent, setHighlightedContent] = useState('');

  useEffect(() => {
    if (content && searchText) {
      const highlighted = highlightContent(content);
      setHighlightedContent(highlighted);
    } else {
      setHighlightedContent(content);
    }
  }, [content, searchText]);

  const highlightContent = (text) => {
    if (!text || !searchText) return text;
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const formatJson = () => {
    try {
      if (!content.trim()) {
        setError('请输入 JSON 内容');
        return;
      }
      const parsedJson = JSON.parse(content);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setContent(formattedJson);
      setError('');
    } catch (err) {
      setError('无效的 JSON 格式');
    }
  };

  const compressJson = () => {
    try {
      if (!content.trim()) {
        setError('请输入 JSON 内容');
        return;
      }
      const parsedJson = JSON.parse(content);
      const compressedJson = JSON.stringify(parsedJson);
      setContent(compressedJson);
      setError('');
    } catch (err) {
      setError('无效的 JSON 格式');
    }
  };

  const copyToClipboard = async () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyStatus({ success: true, message: '已复制！' });
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      setCopyStatus({ success: false, message: '复制失败' });
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    }
  };

  return (
    <div className="json-formatter">
      <div className="json-container">
        <div className="editor-section">
          <h2>JSON 编辑器</h2>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="输入要查找的内容..."
            className="search-input"
          />
          <textarea
            className="editor-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在此输入 JSON..."
          />
          <div className="search-highlight-overlay">
            {content ? (
              <pre
                className="editor-content"
                dangerouslySetInnerHTML={{
                  __html: highlightedContent || content
                }}
              />
            ) : null}
          </div>
          <div className="button-group">
            <button onClick={formatJson}>格式化</button>
            <button onClick={compressJson}>压缩</button>
            {content && (
              <>
                <button 
                  onClick={copyToClipboard} 
                  className={`copy-button ${copyStatus.success ? 'success' : ''}`}
                >
                  {copyStatus.message || '复制'}
                </button>
                <button onClick={() => {
                  setContent('');
                  setError('');
                  setSearchText('');
                }} className="clear-button">清除</button>
              </>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;