import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentLayout from '../common/ContentLayout/ContentLayout';
import './SqlFormatter.css';

const SqlFormatter = () => {
  const { t } = useTranslation();
  const [sql, setSql] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState({ success: false, message: '' });

  // SQL语法校验
  const validateSql = () => {
    try {
      if (!sql.trim()) {
        setError(t('pleaseEnterSQL'));
        return false;
      }
      // TODO: 添加更复杂的SQL语法校验
      setError('');
      return true;
    } catch (err) {
      setError(t('invalidSQL'));
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
      setError(t('formatFailed'));
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
      setError(t('compressFailed'));
    }
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopyStatus({ success: true, message: t('copied') });
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      setCopyStatus({ success: false, message: t('copyFailed') });
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
    <ContentLayout title={t('sqlFormatter')}>
      <div className="input-section">
        <textarea
          className="editor-content"
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder={t('enterSQLHere')}
        />
        <div className="button-group">
          <button onClick={formatSql}>{t('format')}</button>
          <button onClick={compressSql}>{t('compress')}</button>
          {sql && (
            <>
              <button 
                onClick={copyToClipboard} 
                className={`copy-button ${copyStatus.success ? 'success' : ''}`}
              >
                {copyStatus.message || t('copy')}
              </button>
              <button onClick={clearContent} className="clear-button">{t('clear')}</button>
            </>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </ContentLayout>
  );
};

export default SqlFormatter;
