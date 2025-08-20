import { useContext } from 'react';
import { HomeContext } from '../contexts/HomeContext';
import type { HomeContextType } from '../contexts/HomeContext';

export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
};
