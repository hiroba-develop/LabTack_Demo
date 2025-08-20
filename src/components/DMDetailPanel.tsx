import React from 'react';
import { useDM } from '../hooks/useDM';
import { mockUsers } from '../mocks/data';
import { Users, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Avatar from './Avatar';

const DMDetailPanel: React.FC = () => {
    const { selectedConversation, selectedNotification } = useDM();
    const currentUserId = 'user-0';

    if (!selectedConversation && !selectedNotification) {
        return <div className="p-4 text-sm text-gray-500">詳細情報を表示します。</div>;
    }

    if (selectedConversation) {
        const otherParticipantId = selectedConversation.participantIds.find(id => id !== currentUserId);
        const otherUser = otherParticipantId ? mockUsers[otherParticipantId] : null;

        return (
            <div className="p-4">
                <h3 className="font-bold text-lg mb-4">会話の詳細</h3>
                <div className="flex items-center space-x-3">
                    <Avatar avatarUrl={otherUser?.avatarUrl} name={otherUser?.name} status={otherUser?.status} size={48}/>
                    <div>
                        <p className="font-bold">{otherUser?.name}</p>
                        <p className="text-sm text-gray-500">{otherUser?.status === 'online' ? 'オンライン' : 'オフライン'}</p>
                    </div>
                </div>
                 {/* TODO: Add shared files section */}
            </div>
        );
    }

    if (selectedNotification) {
        const { event, fromUserId, status } = selectedNotification;
        const fromUser = mockUsers[fromUserId];
        
        return (
            <div className="p-4">
                <h3 className="font-bold text-lg mb-4">予定の詳細</h3>
                <div className="space-y-3">
                    <div className="font-bold text-xl">{event.title}</div>
                    <div className="flex items-center text-sm">
                        <Calendar size={16} className="mr-2"/>
                        {format(event.start, 'yyyy年M月d日')}
                    </div>
                    <div className="flex items-center text-sm">
                        <Clock size={16} className="mr-2"/>
                        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                    </div>
                    <div className="flex items-center">
                        <Users size={16} className="mr-2"/>
                        <div className="flex items-center space-x-2">
                           <Avatar avatarUrl={fromUser.avatarUrl} name={fromUser.name} size={24} status={fromUser.status}/>
                           <span className="text-sm">{fromUser.name} (主催)</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm mb-2">出欠確認</p>
                        <div className="flex gap-2">
                             <span className={`px-3 py-1 text-sm rounded-full ${
                                 status === 'accepted' ? 'bg-green-100 text-green-800' :
                                 status === 'declined' ? 'bg-red-100 text-red-800' :
                                 'bg-gray-100 text-gray-800'
                             }`}>
                                 {status === 'pending' ? '未返信' : status === 'accepted' ? '参加' : '不参加'}
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null;
};

export default DMDetailPanel;
