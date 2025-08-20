import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface SettingsContextType {
  drivePath: string;
  setDrivePath: (path: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// A mock function to simulate saving to a persistent store
const saveSettingsToStore = (settings: { drivePath: string }) => {
    console.log('Saving settings:', settings);
    localStorage.setItem('labtack_settings', JSON.stringify(settings));
};

const loadSettingsFromStore = (): { drivePath: string } => {
    const stored = localStorage.getItem('labtack_settings');
    if (stored) {
        return JSON.parse(stored);
    }
    // Return default settings if nothing is stored
    return {
        drivePath: '\\\\lab-server\\share\\research_docs',
    };
};


export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [drivePath, setDrivePathState] = useState<string>(() => loadSettingsFromStore().drivePath);

  const setDrivePath = (newPath: string) => {
    setDrivePathState(newPath);
    saveSettingsToStore({ drivePath: newPath });
  };

  const value = {
    drivePath,
    setDrivePath,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

