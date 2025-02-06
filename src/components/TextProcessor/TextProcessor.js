import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentLayout from '../common/ContentLayout/ContentLayout';
import './TextProcessor.css';
import { ClipboardUtils } from '../../utils/clipboard';


const TextProcessor = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [affixText, setAffixText] = useState('');
  const [affixType, setAffixType] = useState('prefix');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState({ success: false, message: '' });

  const sortLines = (ascending = true) => {
    if (!content.trim()) {
      setError(t('pleaseEnterText'));
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
      setError(t('pleaseEnterText'));
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
      setError(t('pleaseEnterText'));
      return;
    }

    if (affixType !== 'separator' || !affixText) {
      setError(t('textSplit'));
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
      setError(t('pleaseEnterText'));
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
      setError(t('pleaseEnterText'));
      return;
    }
    const lines = content.split('\n').filter(line => line.trim());
    setContent(lines.join(''));
    setError('');
  };

  const copyToClipboard = async () => {
      const success = await ClipboardUtils.copyText(content);
      if (success) {
        setCopyStatus({ success: true, message: t('copied') });
        setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
      } else {
        setCopyStatus({ success: false, message: t('copyFailed') });
        setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
      }
    };

  return (
    <ContentLayout title={t('textProcessor')}>
      <div className="input-section">
        <div className="editor-section">
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                value={affixText}
                onChange={(e) => setAffixText(e.target.value)}
                placeholder={t('pleaseEnterAddChar')}
                className="affix-input"
              />
            </div>
            <div className="input-wrapper">
              <select
                value={affixType}
                onChange={(e) => setAffixType(e.target.value)}
                className="affix-select"
              >
                <option value="prefix">{t('row_header')}</option>
                <option value="suffix">{t('row_tail')}</option>
                <option value="separator">{t('row_split')}</option>
              </select>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('pleaseEnterMultiText')}
          />
          <div className="button-group">
            <button onClick={() => sortLines(true)}>{t('row_asc')}</button>
            <button onClick={() => sortLines(false)}>{t('row_desc')}</button>
            <button onClick={processLines}>{t('row_add')}</button>
            <button onClick={removeLines}>{t('row_cut')}</button>
            <button onClick={lineBreak}>{t('row_lineBreak')}</button>
            <button onClick={compressLines}>{t('compress')}</button>
            {content && (
              <>
                <button 
                  onClick={copyToClipboard} 
                  className={`copy-button ${copyStatus.success ? 'success' : ''}`}
                >
                  {copyStatus.message || t('copy')}
                </button>
                <button onClick={clearAll} className="clear-button">{t('clear')}</button>
              </>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </ContentLayout>
  );
};

export default TextProcessor;