import React from 'react';
import { useDM } from '../hooks/useDM';
import { mockDirectMessages, mockUsers } from '../mocks/data';
import { Send } from 'lucide-react';
import Avatar from './Avatar';

const DirectMessageChat: React.FC = () => {
  const { selectedConversation } = useDM();
  
  // Assume current user is 'user-0'
  const currentUserId = 'user-0';

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">会話を選択してください。</p>
      </div>
    );
  }

  const otherParticipantId = selectedConversation.participantIds.find(id => id !== currentUserId);
  const otherUser = otherParticipantId ? mockUsers[otherParticipantId] : null;
  const messages = mockDirectMessages[selectedConversation.id || ''] || [];
  
  return (
    <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center flex-shrink-0">
            <Avatar avatarUrl={otherUser?.avatarUrl} name={otherUser?.name} status={otherUser?.status} size={40} />
            <h2 className="text-lg font-bold text-primary ml-3">{otherUser?.name}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-5xl w-full">
            {messages.map(msg => {
                const user = mockUsers[msg.userId || ''];
                const isCurrentUser = msg.userId === currentUserId;
                return (
                    <div key={msg.id} className={`flex items-start mb-4 ${isCurrentUser ? 'justify-end' : ''}`}>
                        {!isCurrentUser && <div className="mr-3"><Avatar avatarUrl={user?.avatarUrl} name={user?.name} status={user?.status} size={40} /></div>}
                        <div className={`p-3 rounded-lg max-w-xl ${isCurrentUser ? 'bg-primary text-white' : 'bg-sub1'}`}>
                            <p>{msg.content}</p>
                            <p className={`text-xs mt-1 ${isCurrentUser ? 'text-gray-200' : 'text-gray-500'}`}>
                                {new Date(msg.createdAt || '').toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        {isCurrentUser && <div className="ml-3"><Avatar avatarUrl={user?.avatarUrl} name={user?.name} status={user?.status} size={40} /></div>}
                    </div>
                );
            })}
             {messages.length === 0 && (
                <div className="text-center text-gray-500 pt-8">
                    <p>まだメッセージはありません。</p>
                </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border flex-shrink-0">
            <div className="relative max-w-5xl">
                <input 
                    type="text"
                    placeholder={`${otherUser?.name} さんへメッセージを送信`}
                    className="w-full bg-sub1 border border-border rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-primary">
                    <Send size={20} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default DirectMessageChat;
