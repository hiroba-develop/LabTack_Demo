import React from 'react';
import Avatar from './Avatar';
import { useHome } from '../hooks/useHome';
import { mockMessages, mockUsers, Message, mockFiles } from '../mocks/data';
import { Send, MessageSquare } from 'lucide-react';
import { useDetailPanel } from '../hooks/useDetailPanel';
import HomeFileDetailPanel from './HomeFileDetailPanel';
import ThreadView from './ThreadView';

const MessageContent: React.FC<{ content: string }> = ({ content }) => {
    const { setPanelContent } = useDetailPanel();

    const handleFileClick = (fileName: string) => {
        const file = mockFiles.find(f => f.name === fileName);
        if (file) {
            setPanelContent(<HomeFileDetailPanel file={file} />);
        } else {
            console.warn(`File "${fileName}" not found in mock data.`);
        }
    };

    const parts = content.split(/(\[.*?\])/g);

    return (
        <p className="text-text">
            {parts.map((part, index) => {
                const match = part.match(/\[(.*?)\]/);
                if (match) {
                    const fileName = match[1];
                    return (
                        <span
                            key={index}
                            className="text-primary font-bold hover:underline cursor-pointer bg-gray-100 px-2 py-1 rounded"
                            onClick={() => handleFileClick(fileName)}
                        >
                            {part}
                        </span>
                    );
                }
                return part;
            })}
        </p>
    );
};


const ChannelChat: React.FC = () => {
    const { selectedChannel } = useHome();
    const { setPanelContent } = useDetailPanel();

    if (!selectedChannel) {
        return <div className="flex items-center justify-center h-full"><p className="text-gray-500">チャンネルを選択してください。</p></div>;
    }

    const allMessages = mockMessages[selectedChannel.id || ''] || [];
    const parentMessages = allMessages.filter(m => !m.parentId);
    
    const getReplies = (messageId: string): Message[] => {
        return allMessages.filter(m => m.parentId === messageId);
    }

    const handleReplyClick = (message: Message) => {
        const replies = getReplies(message.id!);
        setPanelContent(<ThreadView parentMessage={message} replies={replies} />);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary"># {selectedChannel.name}</h2>
                <p className="text-sm text-gray-500">チャンネルの説明やトピックをここに表示します。</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {parentMessages.map(msg => {
                    const user = mockUsers[msg.userId || ''];
                    const replies = getReplies(msg.id!);
                    return (
                        <div key={msg.id} className="flex items-start mb-4 p-3 rounded-lg hover:bg-sub1">
                            <div className="mr-3">
                                <Avatar avatarUrl={user?.avatarUrl} name={user?.name} status={user?.status} size={40} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-baseline">
                                    <span className="font-bold mr-2">{user?.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(msg.createdAt || '').toLocaleString('ja-JP')}
                                    </span>
                                </div>
                                <MessageContent content={msg.content || ''} />
                                {replies.length > 0 && (
                                    <button 
                                        onClick={() => handleReplyClick(msg)}
                                        className="text-sm text-primary mt-2 flex items-center"
                                    >
                                        <MessageSquare size={16} className="mr-1"/>
                                        {replies.length}件の返信
                                    </button>
                                )}
                            </div>
                             <button onClick={() => handleReplyClick(msg)} className="text-sm text-gray-500 hover:text-primary ml-4">
                                返信する
                            </button>
                        </div>
                    );
                })}
                {parentMessages.length === 0 && (
                    <div className="text-center text-gray-500"><p>まだメッセージはありません。</p><p>最初のメッセージを送信してみましょう！</p></div>
                )}
            </div>

            <div className="p-4 border-t border-border">
                <div className="relative">
                    <input 
                        type="text"
                        placeholder={`# ${selectedChannel.name} へメッセージを送信`}
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

export default ChannelChat;
