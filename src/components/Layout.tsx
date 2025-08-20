import React from 'react';
import { Home, MessageSquare, FileText, Calendar, Settings, User } from 'lucide-react';
import logo from '/labtack_logo.png';
import { NavLink } from 'react-router-dom';
import { useDetailPanel } from '../hooks/useDetailPanel';

interface LayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  headerTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebarContent, headerTitle }) => {
  const { panelContent } = useDetailPanel();

  return (
    <div className="flex h-screen bg-sub1">
      {/* A: サイドバー */}
      <div className="w-20 bg-primary text-white flex flex-col items-center py-4 justify-between flex-shrink-0">
        <div>
          <div className="w-16 h-16 mb-6 flex items-center justify-center">
            <img src={logo} alt="LabTack Logo" className="w-14 h-14 rounded-lg" />
          </div>
          <nav className="flex flex-col items-center space-y-2">
            <NavLink to="/" className={({ isActive }) => `p-3 rounded-lg ${isActive ? 'bg-accent text-white' : 'hover:bg-opacity-80'}`} title="ホーム">
              <Home size={24} />
            </NavLink>
            <NavLink to="/dm" className={({ isActive }) => `p-3 rounded-lg ${isActive ? 'bg-accent text-white' : 'hover:bg-opacity-80'}`} title="DM">
              <MessageSquare size={24} />
            </NavLink>
            <NavLink to="/files" className={({ isActive }) => `p-3 rounded-lg ${isActive ? 'bg-accent text-white' : 'hover:bg-opacity-80'}`} title="ファイル">
              <FileText size={24} />
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => `p-3 rounded-lg ${isActive ? 'bg-accent text-white' : 'hover:bg-opacity-80'}`} title="カレンダー">
              <Calendar size={24} />
            </NavLink>
             <NavLink to="/settings" className={({ isActive }) => `p-3 rounded-lg ${isActive ? 'bg-accent text-white' : 'hover:bg-opacity-80'}`} title="設定">
              <Settings size={24} />
            </NavLink>
          </nav>
        </div>
        <div className="p-3 cursor-pointer hover:bg-opacity-80 rounded-lg" title="プロフィール">
          <User size={24} />
        </div>
      </div>

      {/* B: 項目一覧 */}
      <div className="w-72 bg-gray-50 border-r border-border flex flex-col flex-shrink-0">
        <div className="p-4 h-16 flex items-center border-b border-border flex-shrink-0">
          <h1 className="text-xl font-bold text-primary">{headerTitle}</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sidebarContent}
        </div>
      </div>

      {/* C: 詳細表示 */}
      <main className="flex-1 bg-white flex flex-col">
        {children}
      </main>

      {/* D: さらなる詳細表示 (パネル) */}
      <aside 
        className={`transition-all duration-300 ease-in-out bg-white border-l border-border flex-shrink-0 ${panelContent ? 'w-96' : 'w-0'}`}
      >
          {panelContent}
      </aside>
    </div>
  );
};

export default Layout;
