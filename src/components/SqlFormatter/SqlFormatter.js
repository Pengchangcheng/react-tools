import React, { useState } from 'react';
import './SqlFormatter.css';

const SqlFormatter = () => {
  const [sql, setSql] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState({ success: false, message: '' });

  // SQL语法校验
  const validateSql = () => {
    try {
      if (!sql.trim()) {
        setError('请输入SQL语句');
        return false;
      }
      // TODO: 添加更复杂的SQL语法校验
      setError('');
      return true;
    } catch (err) {
      setError('SQL语法错误');
      return false;
    }
  };

  // SQL格式化
  const formatSql = () => {
    if (!validateSql()) return;
    
    try {
      // TODO: 实现SQL格式化逻辑
      const formattedSql = sql
        .replace(/\bSELECT\b/gi, '\nSELECT ')
        .replace(/\bFROM\b/gi, '\nFROM ')
        .replace(/\bWHERE\b/gi, '\nWHERE ')
        .replace(/\bJOIN\b/gi, '\nJOIN ')
        .replace(/\bGROUP BY\b/gi, '\nGROUP BY ')
        .replace(/\bORDER BY\b/gi, '\nORDER BY ');
      
      setSql(formattedSql.trim());
      setError('');
    } catch (err) {
      setError('格式化失败');
    }
  };

  // SQL压缩
  const compressSql = () => {
    if (!validateSql()) return;
    
    try {
      const compressedSql = sql
        .replace(/\s+/g, ' ') // 替换多个空格为单个空格
        .replace(/\s*\(\s*/g, '(') // 去除括号内外的空格
        .replace(/\s*\)\s*/g, ')')
        .trim();
      
      setSql(compressedSql);
      setError('');
    } catch (err) {
      setError('压缩失败');
    }
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopyStatus({ success: true, message: '已复制！' });
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      setCopyStatus({ success: false, message: '复制失败' });
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    }
  };

  // 清除内容
  const clearContent = () => {
    setSql('');
    setError('');
    setCopyStatus({ success: false, message: '' });
  };

  return (
    <div className="sql-formatter">
      <div className="sql-container">
        <div className="editor-section">
          <h2>SQL 格式化工具</h2>
          <textarea
            className="editor-content"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="在此输入 SQL..."
          />
          <div className="button-group">
            <button onClick={formatSql}>格式化</button>
            <button onClick={compressSql}>压缩</button>
            {sql && (
              <>
                <button 
                  onClick={copyToClipboard} 
                  className={`copy-button ${copyStatus.success ? 'success' : ''}`}
                >
                  {copyStatus.message || '复制'}
                </button>
                <button onClick={clearContent} className="clear-button">清除</button>
              </>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SqlFormatter;
