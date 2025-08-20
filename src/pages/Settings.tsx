import React from 'react';
import DriveSettings from '../components/DriveSettings';
import ProfileSettings from '../components/ProfileSettings';

const Settings: React.FC = () => {
  return (
    <div className="p-8 bg-sub1 h-full overflow-y-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">設定</h1>
        <div className="space-y-8 max-w-4xl mx-auto">
            <ProfileSettings />
            <DriveSettings />
            {/* 他の設定コンポーネントもここに追加していく */}
        </div>
    </div>
  );
};

export default Settings;
