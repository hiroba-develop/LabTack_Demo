import React from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { mockUsers } from '../mocks/data';
import type { CalendarEvent } from '../mocks/data';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import Avatar from './Avatar';

const EventItem: React.FC<{ event: CalendarEvent }> = ({ event }) => (
    <div className="p-3 bg-sub1 rounded-lg">
        <p className="font-bold">{event.title}</p>
        <p className="text-sm text-gray-600">
            {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
        </p>
        <div className="flex -space-x-2 overflow-hidden mt-2">
            {event.participantIds.map(id => {
                const user = mockUsers[id];
                return <Avatar key={id} avatarUrl={user?.avatarUrl} name={user?.name} size={24} />;
            })}
        </div>
    </div>
);


const DateDetailPanel: React.FC = () => {
    const { selectedDate, events } = useCalendar();

    if (!selectedDate) {
        return (
            <div className="p-4">
                <h3 className="font-bold text-lg mb-4">タスクリスト</h3>
                <TodoList />
                <AddTodoForm />
            </div>
        );
    }
    
    const eventsOnSelectedDate = events.filter(
        e => format(e.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    return (
        <div className="p-4 h-full overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">
                {format(selectedDate, 'M月d日 (E)', { locale: ja })}
            </h3>

            <div className="space-y-3 mb-6">
                {eventsOnSelectedDate.length > 0 ? (
                    eventsOnSelectedDate.map(event => <EventItem key={event.id} event={event} />)
                ) : (
                    <p className="text-sm text-gray-500">この日の予定はありません。</p>
                )}
            </div>
            
            <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-4">タスクリスト</h3>
                <TodoList />
                <AddTodoForm />
            </div>
        </div>
    );
};

export default DateDetailPanel;
