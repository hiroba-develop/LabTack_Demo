import React from 'react';
import { useDM } from '../hooks/useDM';
import { mockUsers } from '../mocks/data';
import { Bell, CalendarPlus, Check, X } from 'lucide-react';

const NotificationList: React.FC = () => {
  const { notifications, selectedNotificationId, setSelectedNotificationId, updateNotificationStatus } = useDM();

  if (notifications.length === 0) {
    return null;
  }

  const handleStatusUpdate = (e: React.MouseEvent, id: string, status: 'accepted' | 'declined') => {
      e.stopPropagation();
      updateNotificationStatus(id, status);
  }

  return (
    <div className="p-2">
        <h3 className="font-bold text-lg px-3 py-2 flex items-center"><Bell size={18} className="mr-2"/>通知</h3>
        {notifications.map(notif => {
            const fromUser = mockUsers[notif.fromUserId];
            const isSelected = notif.id === selectedNotificationId;

            return (
                <div 
                    key={notif.id}
                    className={`p-3 rounded-lg cursor-pointer ${isSelected ? 'bg-primary text-white' : 'hover:bg-sub1'}`}
                    onClick={() => setSelectedNotificationId(notif.id)}
                >
                    <div className="flex items-start">
                        <CalendarPlus size={24} className={`mr-3 mt-1 ${isSelected ? 'text-white' : 'text-accent'}`} />
                        <div className="flex-1">
                            <p className="text-sm">
                                <span className="font-bold">{fromUser.name}</span> さんから
                                <span className="font-bold">「{notif.event.title}」</span>
                                への招待が届いています。
                            </p>
                            {notif.status === 'pending' && (
                                <div className="flex gap-2 mt-2">
                                    <button 
                                        onClick={(e) => handleStatusUpdate(e, notif.id, 'accepted')}
                                        className="flex-1 bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600 flex items-center justify-center">
                                        <Check size={16} className="mr-1"/> 承認
                                    </button>
                                    <button 
                                        onClick={(e) => handleStatusUpdate(e, notif.id, 'declined')}
                                        className="flex-1 bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 flex items-center justify-center">
                                        <X size={16} className="mr-1"/> 拒否
                                    </button>
                                </div>
                            )}
                            {notif.status === 'accepted' && <p className="text-sm text-green-500 font-bold mt-1">承認済み</p>}
                            {notif.status === 'declined' && <p className="text-sm text-red-500 font-bold mt-1">拒否済み</p>}
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  );
};

export default NotificationList;
