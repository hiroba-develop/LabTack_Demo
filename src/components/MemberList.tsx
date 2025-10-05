import React from 'react';
import { Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockUsers } from '../mocks/data';
import { useHome } from '../hooks/useHome';


const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedChannelId } = useHome();
  const members = Object.values(mockUsers);

  const isSelected = location.pathname === '/members';

  const handleMembersClick = () => {
    setSelectedChannelId(null); // チャンネルの選択状態をクリア
    navigate('/members');
  };

  return (
    <div className="p-2">
      <div 
        className={`flex items-center p-2 text-sm rounded-md cursor-pointer transition-colors ${
          isSelected 
            ? 'bg-primary text-white font-bold' 
            : 'text-gray-600 hover:bg-sub1'
        }`}
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
