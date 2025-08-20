import React, { useCallback, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { SlotInfo } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarEvent } from '../mocks/data';

const locales = {
  'ja': ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: ja }),
  getDay,
  locales,
});

const messages = {
  allDay: '終日',
  previous: '前',
  next: '次',
  today: '今日',
  month: '月',
  week: '週',
  day: '日',
  agenda: '予定一覧',
  date: '日付',
  time: '時間',
  event: 'イベント',
  showMore: (total: number) => `他 ${total} 件`,
};

const formats = {
    monthHeaderFormat: 'yyyy年M月',
    dayRangeHeaderFormat: ({ start, end }: {start: Date, end: Date}) =>
        `${format(start, 'M月d日')} – ${format(end, 'M月d日')}`,
    dayHeaderFormat: 'M月d日(EEE)',
    weekdayFormat: (date: Date) => format(date, 'EEE', { locale: ja }),
    agendaHeaderFormat: ({ start, end }: {start: Date, end: Date}) =>
        `${format(start, 'M月d日')} – ${format(end, 'M月d日')}`,
    agendaDateFormat: (date: Date) => format(date, 'M月d日(EEE)', { locale: ja }),
};

const userColors = [
    '#3174ad', // user-0
    '#4caf50', // user-1
    '#ff9800', // user-2
    '#e91e63', // user-3
];

const CalendarView: React.FC = () => {
    const { 
        events, filteredEvents, view, setView, date, setDate, setSelectedDate,
        setIsEventModalOpen, setSelectedEvent 
    } = useCalendar();

    const agendaEvents = useMemo(() => {
        return events.filter(event => event.participantIds.includes('user-0'));
    }, [events]);

    const eventPropGetter = useCallback((event: CalendarEvent) => {
        if (view === 'agenda') {
            return {};
        }
        const userIndex = parseInt(event.ownerId.split('-')[1] || '0', 10);
        const backgroundColor = userColors[userIndex % userColors.length];
        return { style: { backgroundColor, border: 'none' } };
    }, [view]);

    const handleSelectSlot = useCallback(
        (slotInfo: SlotInfo) => {
            setSelectedDate(slotInfo.start);
            setSelectedEvent({
                title: '',
                start: slotInfo.start,
                end: slotInfo.end,
                participantIds: ['user-0']
            });
            setIsEventModalOpen(true);
        },
        [setSelectedDate, setSelectedEvent, setIsEventModalOpen]
    );

    const handleSelectEvent = useCallback(
        (event: CalendarEvent) => {
            // resource.originalId を使って、元のイベントを見つける
            const originalId = event.resource?.originalId || event.id.split('-').slice(0, 2).join('-');
            const originalEvent = events.find(e => e.id === originalId);
            if(originalEvent) {
                setSelectedEvent(originalEvent);
                setIsEventModalOpen(true);
            }
        },
        [events, setSelectedEvent, setIsEventModalOpen]
    );

    return (
        <div className="p-4 h-full">
            <Calendar
                localizer={localizer}
                events={view === 'agenda' ? agendaEvents : filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                messages={messages}
                formats={formats}
                eventPropGetter={eventPropGetter}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
            />
        </div>
    );
};

export default CalendarView;

