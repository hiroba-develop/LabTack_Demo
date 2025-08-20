import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { FileItem, mockFiles } from '../mocks/data';

export interface FileContextType {
  files: FileItem[];
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  selectedFileId: string | null;
  setSelectedFileId: (id: string | null) => void;
  selectedFile: FileItem | null;
  currentPath: FileItem[];
  currentFolderContents: FileItem[];
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files] = useState<FileItem[]>(mockFiles);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>('file-root-1'); // Default to 'LAB'
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const getFolderPath = (folderId: string | null): FileItem[] => {
    if (!folderId) return [];
    const path: FileItem[] = [];
    let current = files.find(f => f.id === folderId);
    while (current) {
      path.unshift(current);
      current = files.find(f => f.id === current?.parentId);
    }
    return path;
  };

  const currentPath = useMemo(() => getFolderPath(currentFolderId), [currentFolderId, files]);
  
  const currentFolderContents = useMemo(() => 
    files.filter(f => f.parentId === currentFolderId),
    [currentFolderId, files]
  );

  const selectedFile = useMemo(() => 
    files.find(f => f.id === selectedFileId) || null,
    [selectedFileId, files]
  );

  const value = {
    files,
    currentFolderId,
    setCurrentFolderId,
    selectedFileId,
    setSelectedFileId,
    selectedFile,
    currentPath,
    currentFolderContents,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

