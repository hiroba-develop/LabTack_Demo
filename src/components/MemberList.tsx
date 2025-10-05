import React from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mocks/data';


const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const members = Object.values(mockUsers);

  const handleMembersClick = () => {
    navigate('/members');
  };

  return (
    <div className="p-2">
      <div 
        className="flex items-center p-2 text-sm text-gray-600 hover:bg-sub1 rounded-md cursor-pointer transition-colors"
        onClick={handleMembersClick}
      >
        <Users size={16} className="mr-2" />
        <span className="font-semibold flex-1">メンバー</span>
        <span className="text-xs text-gray-400">{members.length}</span>
      </div>
      
    </div>
  );
};

export default MemberList;
