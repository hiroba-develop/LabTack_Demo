import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockConversations, mockNotifications } from '../mocks/data';
import type { Conversation, Notification, NotificationStatus } from '../mocks/data';

export interface DMContextType {
  conversations: Conversation[];
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  selectedConversation: Conversation | null;
  notifications: Notification[];
  selectedNotificationId: string | null;
  setSelectedNotificationId: (id: string | null) => void;
  selectedNotification: Notification | null;
  updateNotificationStatus: (id: string, status: NotificationStatus) => void;
}

export const DMContext = createContext<DMContextType | undefined>(undefined);

export const DMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(mockConversations[0]?.id || null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;
  const selectedNotification = notifications.find(n => n.id === selectedNotificationId) || null;

  const updateNotificationStatus = (id: string, status: NotificationStatus) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status } : n));
  }

  const handleSetSelectedConversationId = (id: string | null) => {
    setSelectedConversationId(id);
    setSelectedNotificationId(null);
  }

  const handleSetSelectedNotificationId = (id: string | null) => {
    setSelectedNotificationId(id);
    setSelectedConversationId(null);
  }

  const value = {
    conversations,
    selectedConversationId,
    setSelectedConversationId: handleSetSelectedConversationId,
    selectedConversation,
    notifications,
    selectedNotificationId,
    setSelectedNotificationId: handleSetSelectedNotificationId,
    selectedNotification,
    updateNotificationStatus,
  };

  return <DMContext.Provider value={value}>{children}</DMContext.Provider>;
};

