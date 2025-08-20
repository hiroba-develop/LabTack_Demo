import React from 'react';
import { useCalendar } from '../hooks/useCalendar';

const CalendarViewSwitcher: React.FC = () => {
    const { view, setView } = useCalendar();

    const views = [
        { key: 'month', label: '月' },
        { key: 'week', label: '週' },
        { key: 'day', label: '日' },
        { key: 'agenda', label: '予定一覧' },
    ];

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">表示切替</h3>
            <div className="flex flex-col space-y-2">
                {views.map(v => (
                    <button
                        key={v.key}
                        onClick={() => setView(v.key as any)}
                        className={`px-4 py-2 text-left rounded-lg ${view === v.key ? 'bg-primary text-white' : 'hover:bg-sub1'}`}
                    >
                        {v.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CalendarViewSwitcher;
