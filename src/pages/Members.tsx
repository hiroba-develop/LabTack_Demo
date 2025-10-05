import React, { useState } from 'react';
import { Search, Settings, ChevronDown } from 'lucide-react';
import { mockUsers } from '../mocks/data';
import type { User as UserType } from '../mocks/data';

const MemberCard: React.FC<{ member: UserType }> = ({ member }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'オンライン';
      case 'away': return '離席中';
      case 'busy': return '取り込み中';
      default: return 'オフライン';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img 
            src={member.avatarUrl} 
            alt={member.name}
            className="w-20 h-20 rounded-full"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white ${getStatusColor(member.status || 'offline')}`}></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{getStatusText(member.status || 'offline')}</p>
        <p className="text-xs text-gray-400">ID: {member.id}</p>
      </div>
    </div>
  );
};

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'name' | 'status'>('name');
  const members = Object.values(mockUsers);

  // 検索フィルタリング
  const filteredMembers = members.filter(member =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ソート
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortOrder === 'name') {
      return (a.name || '').localeCompare(b.name || '');
    } else {
      const statusOrder = { 'online': 1, 'away': 2, 'busy': 3, 'offline': 4 };
      return (statusOrder[a.status as keyof typeof statusOrder] || 4) - 
             (statusOrder[b.status as keyof typeof statusOrder] || 4);
    }
  });

  return (
    <div className="h-full flex flex-col">
      {/* ヘッダー部分 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">メンバー</h1>
            <p className="text-gray-600">{members.length}人のメンバーが参加しています</p>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
        
        {/* 検索バーと並べ順変更 */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ユーザーを検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'name' | 'status')}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
            >
              <option value="name">学年順</option>
              <option value="status">ステータス順</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* メンバー一覧 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedMembers.map(member => (
            <MemberCard 
              key={member.id} 
              member={member}
            />
          ))}
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">検索条件に一致するメンバーが見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
