import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { User as UserIcon, Image, MessageSquare } from 'lucide-react';
import Avatar from './Avatar';

const ProfileSettings: React.FC = () => {
    const { currentUser, updateUser } = useUser();
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || '');
            setAvatarUrl(currentUser.avatarUrl || '');
            setStatusMessage(currentUser.statusMessage || '');
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div>Loading user profile...</div>;
    }

    const handleSave = () => {
        updateUser({ name, avatarUrl, statusMessage });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center">
                <UserIcon size={24} className="mr-3" />
                プロフィール設定
            </h3>

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar avatarUrl={avatarUrl} name={name} status="online" size={80} />
                    <div className="flex-grow">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">表示名</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <Image size={16} className="mr-2"/>アバターURL
                    </label>
                    <input
                        id="avatarUrl"
                        type="text"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md font-mono"
                        placeholder="https://example.com/your-image.png"
                    />
                </div>
                
                <div>
                    <label htmlFor="statusMessage" className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <MessageSquare size={16} className="mr-2"/>ステータスメッセージ
                    </label>
                    <input
                        id="statusMessage"
                        type="text"
                        value={statusMessage}
                        onChange={(e) => setStatusMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="例: 会議中 (15:00まで)"
                    />
                </div>
            </div>

            <div className="mt-8 text-right">
                <button
                    onClick={handleSave}
                    className={`px-6 py-2 rounded-md text-white font-semibold transition-colors ${
                        saved ? 'bg-green-500' : 'bg-primary hover:bg-opacity-90'
                    }`}
                >
                    {saved ? '保存しました' : 'プロフィールを更新'}
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
