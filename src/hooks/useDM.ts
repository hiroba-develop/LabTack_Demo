import { useContext } from 'react';
import { DMContext, DMContextType } from '../contexts/DMContext';

export const useDM = (): DMContextType => {
  const context = useContext(DMContext);
  if (context === undefined) {
    throw new Error('useDM must be used within a DMProvider');
  }
  return context;
};
