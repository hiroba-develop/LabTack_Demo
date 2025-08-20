import React from 'react';
import { useDM } from '../hooks/useDM';
import { mockUsers } from '../mocks/data';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import Avatar from './Avatar';

const ConversationList: React.FC = () => {
  const { conversations, selectedConversationId, setSelectedConversationId } = useDM();
  
  // Assume current user is 'user-0'
  const currentUserId = 'user-0';

  return (
    <div className="p-2">
      {conversations.map(conv => {
        const otherParticipantId = conv.participantIds.find(id => id !== currentUserId);
        const otherUser = otherParticipantId ? mockUsers[otherParticipantId] : null;
        const isSelected = conv.id === selectedConversationId;

        if (!otherUser) return null;

        return (
          <div
            key={conv.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer ${isSelected ? 'bg-primary text-white' : 'hover:bg-sub1'}`}
            onClick={() => setSelectedConversationId(conv.id)}
          >
            <div className="mr-3">
              <Avatar avatarUrl={otherUser.avatarUrl} name={otherUser.name} status={otherUser.status} size={40} />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <p className={`font-bold truncate ${isSelected ? 'text-white' : 'text-text'}`}>{otherUser.name}</p>
                <p className={`text-xs flex-shrink-0 ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                  {formatDistanceToNow(new Date(conv.lastMessage.createdAt || ''), { addSuffix: true, locale: ja })}
                </p>
              </div>
              <p className={`text-sm truncate ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                {conv.lastMessage.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
