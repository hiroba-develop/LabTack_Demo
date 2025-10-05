import React from 'react';
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
  const members = Object.values(mockUsers);

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">メンバー</h1>
        <p className="text-gray-600">{members.length}人のメンバーが参加しています</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map(member => (
          <MemberCard 
            key={member.id} 
            member={member}
          />
        ))}
      </div>
    </div>
  );
};

export default Members;
