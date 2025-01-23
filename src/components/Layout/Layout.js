import React, { useState } from 'react';
import './Layout.css';
import JsonFormatter from '../JsonFormatter/JsonFormatter';
import TextProcessor from '../TextProcessor/TextProcessor';
import SqlFormatter from '../SqlFormatter/SqlFormatter';

// 菜单配置
const menuItems = [
  {
    id: 'json-formatter',
    label: 'JSON Formatter',
    component: <JsonFormatter />
  },
  {
    id: 'text-processor',
    label: 'Text Processor',
    component: <TextProcessor />
  },
  {
    id: 'sql-formatter',
    label: 'SQL Formatter',
    component: <SqlFormatter />
  }
];

const Layout = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].id);

  // 获取当前选中的组件
  const currentComponent = menuItems.find(item => item.id === selectedMenu)?.component;

  return (
    <div className="layout-container">
      <div className="layout-left">
        <nav className="menu-list">
          <ul>
            {menuItems.map(item => (
              <li
                key={item.id}
                className={selectedMenu === item.id ? 'active' : ''}
                onClick={() => setSelectedMenu(item.id)}
              >
                {item.label}
              </li>
            ))}
            <li>Settings</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
      <div className="layout-right">
        <main className="content-area">
          {currentComponent}
        </main>
      </div>
    </div>
  );
};

export default Layout;
