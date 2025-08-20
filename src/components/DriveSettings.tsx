import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { Server } from 'lucide-react';

const DriveSettings: React.FC = () => {
    const { drivePath, setDrivePath } = useSettings();
    const [localPath, setLocalPath] = useState(drivePath);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setDrivePath(localPath);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // Show "Saved!" message for 2 seconds
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                <Server size={24} className="mr-3" />
                共有サーバー設定
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                ファイル機能で同期する共有サーバーのフォルダパスを指定します。
            </p>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    value={localPath}
                    onChange={(e) => setLocalPath(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                    placeholder="例: \\lab-server\share\research_docs"
                />
                <button
                    onClick={handleSave}
                    className={`px-6 py-2 rounded-md text-white font-semibold transition-colors ${
                        saved ? 'bg-green-500' : 'bg-primary hover:bg-opacity-90'
                    }`}
                >
                    {saved ? '保存しました' : '保存'}
                </button>
            </div>
        </div>
    );
};

export default DriveSettings;
