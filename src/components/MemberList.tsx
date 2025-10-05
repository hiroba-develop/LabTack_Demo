import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { mockUsers } from '../mocks/data';
import type { User as UserType } from '../mocks/data';

const MemberItem: React.FC<{ member: UserType }> = ({ member }) => {
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
    <div 
      className="flex items-center p-2 text-sm rounded-md"
    >
      <div className="relative mr-3">
        <img 
          src={member.avatarUrl} 
          alt={member.name}
          className="w-8 h-8 rounded-full"
        />
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-text">{member.name}</div>
        <div className="text-xs text-gray-500">{getStatusText(member.status)}</div>
      </div>
    </div>
  );
};

const MemberList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const members = Object.values(mockUsers);

  return (
    <div className="p-2">
      <div 
        className="flex items-center p-2 text-sm text-gray-600 hover:bg-sub1 rounded-md cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Users size={16} className="mr-2" />
        <span className="font-semibold flex-1">メンバー</span>
        <span className="text-xs text-gray-400">{members.length}</span>
      </div>
      
      {isExpanded && (
        <div className="mt-1">
          {members.map(member => (
            <MemberItem 
              key={member.id} 
              member={member}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;
