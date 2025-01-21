import React, { useState } from 'react';
import './Layout.css';
import JsonFormatter from '../JsonFormatter/JsonFormatter';
import TextProcessor from '../TextProcessor/TextProcessor';

const Layout = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  return (
    <div className="layout-container">
      <div className="layout-left">
        <nav className="menu-list">
          <ul>
            <li onClick={() => setSelectedMenu('json-formatter')}>JSON Formatter</li>
            <li onClick={() => setSelectedMenu('text-processor')}>Text Processor</li>
            <li>Settings</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
      <div className="layout-right">
        <main className="content-area">
          {selectedMenu === 'json-formatter' ? <JsonFormatter /> : null}
          {selectedMenu === 'text-processor' ? <TextProcessor /> : null}
        </main>
      </div>
    </div>
  );
};

export default Layout;