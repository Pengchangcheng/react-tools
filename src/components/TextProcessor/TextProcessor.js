import React, { useState } from 'react';
import './TextProcessor.css';

const TextProcessor = () => {
  const [content, setContent] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState({ success: false, message: '' });

  const sortLines = (ascending = true) => {
    if (!content.trim()) {
      setError('请输入文本内容');
      return;
    }

    const lines = content.split('\n').filter(line => line.trim());
    
    const sortedLines = lines.sort((a, b) => {
      // 尝试数字排序
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return ascending ? numA - numB : numB - numA;
      }
      
      // 字符串排序
      return ascending 
        ? a.localeCompare(b, 'zh-CN')
        : b.localeCompare(a, 'zh-CN');
    });

    setContent(sortedLines.join('\n'));
    setError('');
  };

  const processLines = () => {
    if (!content.trim()) {
      setError('请输入文本内容');
      return;
    }

    const lines = content.split('\n').filter(line => line.trim());
    const processedLines = lines.map(line => `${prefix}${line}${suffix}`);
    setContent(processedLines.join('\n'));
    setError('');
  };

  const clearAll = () => {
    setContent('');
    setPrefix('');
    setSuffix('');
    setError('');
    setCopyStatus({ success: false, message: '' });
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
    <div className="text-processor">
      <div className="text-container">
        <div className="editor-section">
          <h2>文本处理器</h2>
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="输入行首添加的字符"
                className="affix-input"
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="输入行尾添加的字符"
                className="affix-input"
              />
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在此输入多行文本..."
          />
          <div className="button-group">
            <button onClick={() => sortLines(true)}>升序</button>
            <button onClick={() => sortLines(false)}>降序</button>
            <button onClick={processLines}>添加</button>
            {content && (
              <>
                <button 
                  onClick={copyToClipboard} 
                  className={`copy-button ${copyStatus.success ? 'success' : ''}`}
                >
                  {copyStatus.message || '复制'}
                </button>
                <button onClick={clearAll} className="clear-button">清除</button>
              </>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;