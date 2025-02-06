import React, { useState, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import './Layout.css';
import { getMenuConfig } from '../../config/menu';

// 菜单列表组件
const MenuList = ({ items, selectedId, onSelect }) => (
  <nav className="menu-list">
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          className={selectedId === item.id ? 'active' : ''}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </nav>
);

const Layout = () => {
  const { t } = useTranslation();

  // 使用 useMemo 缓存菜单配置
  const menuItems = useMemo(() => getMenuConfig(t), [t]);
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].id);

   // 获取当前选中的组件
   const CurrentComponent = menuItems.find(item => item.id === selectedMenu)?.component || null;

   return (
    <div className="layout-container">
      <div className="layout-left">
        <MenuList
          items={menuItems}
          selectedId={selectedMenu}
          onSelect={setSelectedMenu}
        />
      </div>
      <div className="layout-right">
        <main className="content-area">
          {CurrentComponent && <CurrentComponent />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
