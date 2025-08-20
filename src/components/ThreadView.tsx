import React from 'react';
import type { Message } from '../mocks/data';
import { mockUsers } from '../mocks/data';
import Avatar from './Avatar';
import { Send } from 'lucide-react';

interface ThreadViewProps {
  parentMessage: Message;
  replies: Message[];
}

const ThreadView: React.FC<ThreadViewProps> = ({ parentMessage, replies }) => {
    const parentUser = mockUsers[parentMessage.userId || ''];

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b">
                <h3 className="font-bold text-lg">スレッド</h3>
                <p className="text-sm text-gray-500">#{parentMessage.channelId} での会話</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Parent Message */}
                <div className="flex items-start mb-4">
                    <Avatar avatarUrl={parentUser?.avatarUrl} name={parentUser?.name} status={parentUser?.status} size={40} />
                    <div className="ml-3">
                        <p className="font-bold">{parentUser?.name}</p>
                        <p>{parentMessage.content}</p>
                    </div>
                </div>
                
                <div className="border-t my-4" />

                {/* Replies */}
                <p className="text-sm text-gray-500 mb-2">{replies.length}件の返信</p>
                {replies.map(reply => {
                    const replyUser = mockUsers[reply.userId || ''];
                    return (
                        <div key={reply.id} className="flex items-start mb-4">
                            <Avatar avatarUrl={replyUser?.avatarUrl} name={replyUser?.name} status={replyUser?.status} size={32} />
                            <div className="ml-3">
                                <p className="font-bold text-sm">{replyUser?.name}</p>
                                <p className="text-sm">{reply.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
             <div className="p-4 border-t border-border">
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="返信を追加..."
                        className="w-full bg-sub1 border border-border rounded-lg p-2 pr-10"
                    />
                    <button className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-primary">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreadView;
