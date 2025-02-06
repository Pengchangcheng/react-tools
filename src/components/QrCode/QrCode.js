import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import ContentLayout from '../common/ContentLayout/ContentLayout';
import './QrCode.css';

const QrCode = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState('L');

  const downloadQR = () => {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector('.qr-code svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const a = document.createElement('a');
      a.download = 'qrcode.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <ContentLayout title={t('qrCodeGenerator')}>
      <div className="content-wrapper">
        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('enterQrContent')}
          />
          <div className="controls">
            <div className="control-item">
              <label>{t('size')}:</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min="128"
                max="512"
              />
            </div>

            <div className="control-item">
              <label>{t('foregroundColor')}:</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>

            <div className="control-item">
              <label>{t('backgroundColor')}:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>

            <div className="control-item">
              <label>{t('errorCorrectionLevel')}:</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="L">{t('low')} (7%)</option>
                <option value="M">{t('medium')} (15%)</option>
                <option value="Q">{t('quartile')} (25%)</option>
                <option value="H">{t('high')} (30%)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="preview-section">
          <div className="qr-code">
            {text && (
              <QRCodeSVG
                value={text}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                includeMargin={true}
              />
            )}
          </div>
          {text && (
            <button className="download-button" onClick={downloadQR}>
              {t('downloadQrCode')}
            </button>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default QrCode;