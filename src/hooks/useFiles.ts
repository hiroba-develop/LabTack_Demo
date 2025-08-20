import { useContext } from 'react';
import { FileContext } from '../contexts/FileContext';
import type { FileContextType } from '../contexts/FileContext';

export const useFiles = (): FileContextType => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
