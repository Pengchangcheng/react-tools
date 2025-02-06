import React from 'react';
import './ContentLayout.css';

const ContentLayout = ({ title, children }) => {
  return (
    <div className="content-layout">
      <h2>{title}</h2>
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;