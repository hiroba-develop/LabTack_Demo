import React from 'react';
import ConversationList from './ConversationList';
import NotificationList from './NotificationList';

const DMSidebar: React.FC = () => {
  return (
    <div>
        <h3 className="font-bold text-lg p-3">ダイレクトメッセージ</h3>
        <ConversationList />
        <div className="my-4 border-t border-border" />
        <NotificationList />
    </div>
  );
};

export default DMSidebar;
