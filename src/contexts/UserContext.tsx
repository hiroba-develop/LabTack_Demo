import React, { createContext, useState, useContext, ReactNode } from 'react';
import { components } from '../types/api';
import { mockUsers } from '../mocks/data';

type User = components['schemas']['User'] & { statusMessage?: string; onlineStatus?: 'online' | 'offline' };

export interface UserContextType {
  currentUser: User | null;
  updateUser: (newDetails: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUser: User = {
    ...mockUsers['user-0'], // Assuming 'user-0' is the current logged-in user
    statusMessage: '論文執筆中...集中モード',
    onlineStatus: 'online',
};


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const updateUser = (newDetails: Partial<User>) => {
    if (currentUser) {
        const updatedUser = { ...currentUser, ...newDetails };
        setCurrentUser(updatedUser);
        // Here you would typically also call an API to save the changes
        console.log('User updated:', updatedUser);
    }
  };

  const value = {
    currentUser,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

