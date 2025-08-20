import { useContext } from 'react';
import { CalendarContext } from '../contexts/CalendarContext';
import type { CalendarContextType } from '../contexts/CalendarContext';

export const useCalendar = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
