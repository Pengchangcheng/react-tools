import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './JsonFormatter.css';
import { ClipboardUtils } from '../../utils/clipboard';

const JsonFormatter = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState({ success: false, message: '' });

  const formatJson = () => {
    try {
      if (!content.trim()) {
        setError(t('pleaseEnterJson'));
        return;
      }
      const parsedJson = JSON.parse(content);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setContent(formattedJson);
      setError('');
    } catch (err) {
      setError(t('invalidJson'));
    }
  };

  const compressJson = () => {
    try {
      if (!content.trim()) {
        setError(t('pleaseEnterJson'));
        return;
      }
      const parsedJson = JSON.parse(content);
      const compressedJson = JSON.stringify(parsedJson);
      setContent(compressedJson);
      setError('');
    } catch (err) {
      setError(t('invalidJson'));
    }
  };

  const copyToClipboard = async () => {
    const success = await ClipboardUtils.copyText(content);
    if (success) {
      setCopyStatus({ success: true, message: t('copied')});
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    } else {
      setCopyStatus({ success: false, message: t('copyFailed') });
      setTimeout(() => setCopyStatus({ success: false, message: '' }), 2000);
    }
  };

  return (
    <div className="json-formatter">
      <div className="json-container">
        <div className="editor-section">
          <h2>{t('jsonEditor')}</h2>
          <textarea
            className="editor-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('enterJson')}
          />
          <div className="button-group">
            <button onClick={formatJson}>{t('format')}</button>
            <button onClick={compressJson}>{t('compress')}</button>
            {content && (
              <>
                <button 
                  onClick={copyToClipboard} 
                  className={`copy-button ${copyStatus.success ? 'success' : ''}`}
                >
                  {copyStatus.message || t('copy')}
                </button>
                <button onClick={() => {
                  setContent('');
                  setError('');
                }} className="clear-button">{t('clear')}</button>
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
