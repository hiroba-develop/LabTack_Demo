import React, { useState } from 'react';
import { useFiles } from '../hooks/useFiles';
import { ChevronDown, Folder } from 'lucide-react';
import type { components } from '../types/api';

type FileItem = components['schemas']['File'];

const FolderNode: React.FC<{ folder: FileItem, allFiles: FileItem[] }> = ({ folder, allFiles }) => {
    const { currentFolderId, setCurrentFolderId } = useFiles();
    const [isExpanded, setIsExpanded] = useState(true);

    const isSelected = folder.id === currentFolderId;
    const children = allFiles.filter(file => file.parentId === folder.id && file.type === 'folder');

    const handleSelect = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentFolderId(folder.id ?? null);
    };
    
    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div 
                className={`flex items-center p-2 text-sm rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                onClick={handleSelect}
            >
                <div onClick={toggleExpand} className="mr-1 p-1 hover:bg-gray-200 rounded">
                    <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                </div>
                <Folder size={16} className="mr-2 text-accent" />
                <span className={`truncate ${isSelected ? 'font-semibold' : ''}`}>{folder.name}</span>
            </div>
            {isExpanded && (
                <div className="pl-6 border-l-2 border-gray-200 ml-3">
                    {children.map(child => <FolderNode key={child.id} folder={child} allFiles={allFiles} />)}
                </div>
            )}
        </div>
    );
}


const FolderTree: React.FC = () => {
  const { files } = useFiles();
  const rootFolders = files.filter(file => file.parentId === null && file.type === 'folder');

  return (
    <div className="p-4">
        {rootFolders.map(folder => <FolderNode key={folder.id} folder={folder} allFiles={files} />)}
    </div>
  );
};

export default FolderTree;
