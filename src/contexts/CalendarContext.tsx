import React, { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { View } from 'react-big-calendar';
import { mockCalendarEvents, mockTodos } from '../mocks/data';
import type { CalendarEvent, Todo } from '../mocks/data';

export type EditingEvent = Omit<CalendarEvent, 'id' | 'ownerId'> & { id?: string, ownerId?: string };

export interface CalendarContextType {
  events: CalendarEvent[];
  filteredEvents: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'resource' | 'id' | 'ownerId'>) => void;
  updateEvent: (event: EditingEvent) => void;
  deleteEvent: (id: string) => void;

  view: View;
  setView: (view: View) => void;
  date: Date;
  setDate: (date: Date) => void;

  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;

  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
  selectedEvent: EditingEvent | null;
  setSelectedEvent: (event: EditingEvent | null) => void;
    
  visibleUserIds: string[];
  toggleUserVisibility: (userId: string) => void;

  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EditingEvent | null>(null);

  const [visibleUserIds, setVisibleUserIds] = useState<string[]>(['user-0']);

  const [todos, setTodos] = useState<Todo[]>(mockTodos);

  const filteredEvents = useMemo(() => {
    const newEvents: CalendarEvent[] = [];
    events.forEach(event => {
        event.participantIds.forEach(participantId => {
            if (visibleUserIds.includes(participantId)) {
                newEvents.push({
                    ...event,
                    // 新しいユニークなIDを作成して、Reactが各イベントを個別にレンダリングできるようにする
                    id: `${event.id}-${participantId}`, 
                    // 色分けのために、この予定の「所有者」を参加者本人に設定する
                    ownerId: participantId,
                    // 編集時に元のイベントを見つけられるように、元のIDを保持しておく
                    resource: { originalId: event.id }
                });
            }
        });
    });
    return newEvents;
  }, [events, visibleUserIds]);

  const toggleUserVisibility = (userId: string) => {
    setVisibleUserIds(prev => 
        prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const addEvent = (event: Omit<CalendarEvent, 'resource'|'id'|'ownerId'>) => {
    const newEvent: CalendarEvent = {
        ...event,
        id: `evt-${Date.now()}`,
        ownerId: 'user-0', // Assume current user is the owner
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (eventToUpdate: EditingEvent) => {
    setEvents(prev => prev.map(e => e.id === eventToUpdate.id ? {...e, ...eventToUpdate} as CalendarEvent : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const value = {
    events,
    filteredEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    view,
    setView,
    date,
    setDate,
    selectedDate,
    setSelectedDate,
    isEventModalOpen,
    setIsEventModalOpen,
    selectedEvent,
    setSelectedEvent,
    visibleUserIds,
    toggleUserVisibility,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

