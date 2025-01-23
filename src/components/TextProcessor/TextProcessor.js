import React, { useState } from 'react';
import './TextProcessor.css';
import { ClipboardUtils } from '../../utils/clipboard';

const TextProcessor = () => {
  const [content, setContent] = useState('');
  const [affixText, setAffixText] = useState('');
  const [affixType, setAffixType] = useState('prefix');
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
    const processedLines = lines.map(line => {
      switch (affixType) {
        case 'prefix':
          return `${affixText}${line}`;
        case 'suffix':
          return `${line}${affixText}`;
        case 'separator':
          return line.split(' ').filter(word => word.trim()).join(affixText);
        default:
          return line;
      }
    });
    setContent(processedLines.join('\n'));
    setError('');
  };

  const lineBreak = () => {
    if (!content.trim()) {
      setError('请输入文本内容');
      return;
    }

    if (affixType !== 'separator' || !affixText) {
      setError('请选择分隔符模式并输入分隔符');
      return;
    }

    const parts = content.split(affixText);
    const processedContent = parts
      .map((part, index) => index < parts.length - 1 ? part + affixText : part)
      .join('\n');
    setContent(processedContent);
    setError('');
  };

  const removeLines = () => {
    if (!content.trim()) {
      setError('请输入文本内容');
      return;
    }

    const lines = content.split('\n').filter(line => line.trim());
    const processedLines = lines.map(line => {
      let result = line;
      switch (affixType) {
        case 'prefix':
          if (affixText && result.startsWith(affixText)) {
            result = result.slice(affixText.length);
          }
          break;
        case 'suffix':
          if (affixText && result.endsWith(affixText)) {
            result = result.slice(0, -affixText.length);
          }
          break;
        case 'separator':
          result = result.split(affixText).join('');
          break;
      }
      return result;
    });
    setContent(processedLines.join('\n'));
    setError('');
  };

  const clearAll = () => {
    setContent('');
    setAffixText('');
    setError('');
    setCopyStatus({ success: false, message: '' });
  };

  const compressLines = () => {
    if (!content.trim()) {
      setError('请输入文本内容');
      return;
    }
    const lines = content.split('\n').filter(line => line.trim());
    setContent(lines.join(''));
    setError('');
  };

  const copyToClipboard = async () => {
      const success = await ClipboardUtils.copyText(content);
      if (success) {
        setCopyStatus({ success: true, message: '已复制！' });
        setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
      } else {
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
                value={affixText}
                onChange={(e) => setAffixText(e.target.value)}
                placeholder="输入要添加的字符"
                className="affix-input"
              />
            </div>
            <div className="input-wrapper">
              <select
                value={affixType}
                onChange={(e) => setAffixType(e.target.value)}
                className="affix-select"
              >
                <option value="prefix">行首</option>
                <option value="suffix">行尾</option>
                <option value="separator">分隔符</option>
              </select>
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
            <button onClick={removeLines}>去除</button>
            <button onClick={lineBreak}>换行</button>
            <button onClick={compressLines}>压缩</button>
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