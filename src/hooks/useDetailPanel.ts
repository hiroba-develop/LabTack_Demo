import { useContext } from 'react';
import { DetailPanelContext, DetailPanelContextType } from '../contexts/DetailPanelContext';

export const useDetailPanel = (): DetailPanelContextType => {
  const context = useContext(DetailPanelContext);
  if (context === undefined) {
    throw new Error('useDetailPanel must be used within a DetailPanelProvider');
  }
  return context;
};
