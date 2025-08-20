import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface DetailPanelContextType {
  panelContent: ReactNode | null;
  setPanelContent: (content: ReactNode | null) => void;
  panelTitle: string;
  setPanelTitle: (title: string) => void;
  closePanel: () => void;
}

export const DetailPanelContext = createContext<DetailPanelContextType | undefined>(undefined);

export const DetailPanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [panelContent, setPanelContent] = useState<ReactNode | null>(null);
  const [panelTitle, setPanelTitle] = useState<string>('');

  const closePanel = () => {
    setPanelContent(null);
    setPanelTitle('');
  };

  const value = {
    panelContent,
    setPanelContent,
    panelTitle,
    setPanelTitle,
    closePanel,
  };

  return <DetailPanelContext.Provider value={value}>{children}</DetailPanelContext.Provider>;
};

