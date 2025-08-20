import React, { useEffect } from 'react';
import CalendarView from '../components/CalendarView';
import { useDetailPanel } from '../hooks/useDetailPanel';
import DateDetailPanel from '../components/DateDetailPanel';
import EventEditorModal from '../components/EventEditorModal';

const Calendar: React.FC = () => {
    const { setPanelContent, setPanelTitle } = useDetailPanel();

    useEffect(() => {
        setPanelTitle("詳細");
        setPanelContent(<DateDetailPanel />);

        // Clean up panel on component unmount
        return () => {
            setPanelContent(null);
            setPanelTitle('');
        }
    }, [setPanelContent, setPanelTitle]);

  return (
    <div className="h-full">
        <CalendarView />
        <EventEditorModal />
    </div>
  );
};

export default Calendar;

