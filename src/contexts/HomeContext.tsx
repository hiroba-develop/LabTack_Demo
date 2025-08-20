import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { components } from '../types/api';
import { mockChannels, mockMessages, Message } from '../mocks/data';

type Channel = components['schemas']['Channel'];

export interface HomeContextType {
  channels: Channel[];
  addChannel: (name: string, type: 'directory' | 'file_link', parentId: string | null) => void;
  messages: Record<string, Message[]>;
  addMessage: (channelId: string, content: string, parentId: string | null) => void;
  selectedChannelId: string | null;
  setSelectedChannelId: (id: string | null) => void;
  selectedChannel: Channel | null;
}

export const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(mockChannels[0]?.id || null);

  const findChannelById = (items: Channel[], id: string | null): Channel | null => {
    if (!id) return null;
    for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
            const found = findChannelById(item.children, id);
            if (found) return found;
        }
    }
    return null;
  }

  const selectedChannel = findChannelById(channels, selectedChannelId);

  const addChannel = useCallback((name: string, type: 'directory' | 'file_link', parentId: string | null) => {
    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      name,
      type,
      parentId,
      children: type === 'directory' ? [] : undefined,
    };

    if (parentId === null) {
      setChannels(prev => [...prev, newChannel]);
    } else {
      const addRecursively = (items: Channel[]): Channel[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newChannel]
            };
          }
          if (item.children) {
            return { ...item, children: addRecursively(item.children) };
          }
          return item;
        });
      };
      setChannels(addRecursively);
    }
  }, []);

  const addMessage = useCallback((channelId: string, content: string, parentId: string | null) => {
      const newMessage: Message = {
          id: `msg-${Date.now()}`,
          channelId,
          content,
          parentId,
          userId: 'user-0', // Assume current user
          createdAt: new Date().toISOString(),
      };

      setMessages(prev => ({
          ...prev,
          [channelId]: [...(prev[channelId] || []), newMessage],
      }));
  }, []);

  const value = {
    channels,
    addChannel,
    messages,
    addMessage,
    selectedChannelId,
    setSelectedChannelId,
    selectedChannel,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

