import React from 'react';
import { useTranslation } from 'react-i18next';
import ContentLayout from '../common/ContentLayout/ContentLayout';
import './Settings.css';

const Settings = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <ContentLayout title={t('settings')}>
      <div className="settings-content">
        <div className="language-section">
          <h3>{t('language')}</h3>
          <div className="language-options">
            <button
              className={i18n.language === 'en' ? 'active' : ''}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </button>
            <button
              className={i18n.language === 'zh_CN' ? 'active' : ''}
              onClick={() => handleLanguageChange('zh_CN')}
            >
              简体中文
            </button>
          </div>
        </div>

        <div className="about-section">
          <h3>{t('about')}</h3>
          <p>{t('aboutDescription')}</p>
          <p>Email: <a href="mailto:your.email@example.com">{t('myEmail')}</a></p>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Settings;