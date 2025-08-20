import React from 'react';
import CalendarViewSwitcher from './CalendarViewSwitcher';
import { useCalendar } from '../hooks/useCalendar';
import { mockUsers } from '../mocks/data';

const CalendarSidebar: React.FC = () => {
    const { visibleUserIds, toggleUserVisibility, view } = useCalendar();
    const isAgendaView = view === 'agenda';

    return (
        <div className="p-4">
            <h3 className="font-bold text-lg mb-4">カレンダー</h3>
            <CalendarViewSwitcher />

            <div className={`mt-6 ${isAgendaView ? 'opacity-50' : ''}`}>
                <h4 className="font-bold mb-3">表示するカレンダー</h4>
                <div className="space-y-2">
                    {Object.values(mockUsers).map(user => (
                        <div key={user.id} className={`flex items-center ${isAgendaView ? 'cursor-not-allowed' : ''}`}>
                            <input 
                                type="checkbox" 
                                id={`cal-user-${user.id}`} 
                                checked={isAgendaView ? user.id === 'user-0' : visibleUserIds.includes(user.id!)}
                                onChange={() => toggleUserVisibility(user.id!)}
                                className="mr-2"
                                disabled={isAgendaView}
                            />
                            <label htmlFor={`cal-user-${user.id}`} className={isAgendaView ? 'cursor-not-allowed' : ''}>{user.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarSidebar;
