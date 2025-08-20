import React, { useState } from 'react';
import { useFiles } from '../hooks/useFiles';
import { useDetailPanel } from '../hooks/useDetailPanel';
import FileDetailPanel from './FileDetailPanel';
import DocumentViewer from './DocumentViewer';
import TextViewer from './TextViewer'; // 追加
import { Folder, File, ChevronRight, Bot } from 'lucide-react';
import { format } from 'date-fns';
import { FileItem } from '../mocks/data';
import dummyTxtUrl from '/dummy.txt?url';
import dummyCsvUrl from '/dummy.csv?url';

const FileBrowser: React.FC = () => {
    const { 
        currentPath, 
        currentFolderContents, 
        setCurrentFolderId, 
        selectedFileId, 
        setSelectedFileId
    } = useFiles();
    const { setPanelContent } = useDetailPanel();

    const [docViewerOpen, setDocViewerOpen] = useState(false);
    const [textViewerOpen, setTextViewerOpen] = useState(false); // 追加
    const [viewingFile, setViewingFile] = useState<FileItem | null>(null);

    const handleItemClick = (item: FileItem) => {
        if (item.type === 'file') {
            setSelectedFileId(item.id ?? null);
            setPanelContent(<FileDetailPanel />);
        }
    };

    const handleItemDoubleClick = (item: FileItem) => {
        if (item.type === 'folder') {
            setCurrentFolderId(item.id ?? null);
            setSelectedFileId(null);
            setPanelContent(null);
            return;
        }

        if (item.type === 'file' && item.url) {
            const isOfficeDoc = item.name?.endsWith('.pptx') || item.name?.endsWith('.docx') || item.name?.endsWith('.xlsx') || item.name?.endsWith('.pdf');
            const isTextDoc = item.name?.endsWith('.txt') || item.name?.endsWith('.csv');
            
            let fileToView = { ...item };

            if (isTextDoc) {
                if(item.name === '会議メモ.txt') {
                    fileToView.url = dummyTxtUrl;
                } else if (item.name === '20240722_results.csv') {
                    fileToView.url = dummyCsvUrl;
                }
            }

            if (isOfficeDoc) {
                setViewingFile(fileToView);
                setDocViewerOpen(true);
            } else if (isTextDoc) {
                setViewingFile(fileToView);
                setTextViewerOpen(true);
            }
        }
    };

    const handleSummarizeClick = (e: React.MouseEvent, item: FileItem) => {
        e.stopPropagation(); // Prevent row click from firing
        handleItemClick(item);
    };

    const closeViewers = () => {
        setDocViewerOpen(false);
        setTextViewerOpen(false);
        setViewingFile(null);
    };

    return (
        <div className="flex flex-col h-full p-4">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-4 flex-shrink-0">
                {currentPath.map((folder, index) => (
                    <React.Fragment key={folder.id}>
                        <span 
                            className="hover:underline cursor-pointer"
                            onClick={() => setCurrentFolderId(folder.id ?? null)}
                        >
                            {folder.name}
                        </span>
                        {index < currentPath.length - 1 && <ChevronRight size={16} className="mx-1" />}
                    </React.Fragment>
                ))}
            </div>

            {/* File List Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-bold text-gray-600 border-b pb-2 mb-2 flex-shrink-0">
                <div className="col-span-5">名前</div>
                <div className="col-span-3">最終更新日</div>
                <div className="col-span-2">所有者</div>
                <div className="col-span-2 text-right">アクション</div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto">
            {currentFolderContents.map(item => (
                <div 
                    key={item.id} 
                    className={`grid grid-cols-12 gap-4 items-center p-2 rounded-lg cursor-pointer ${selectedFileId === item.id ? 'bg-blue-100' : 'hover:bg-sub1'}`}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                >
                    <div className="col-span-5 flex items-center">
                        {item.type === 'folder' ? <Folder size={20} className="mr-3 text-accent" /> : <File size={20} className="mr-3 text-gray-500" />}
                        <span className="truncate">{item.name}</span>
                    </div>
                    <div className="col-span-3 text-sm text-gray-600">
                        {format(new Date(item.updatedAt || ''), 'yyyy/MM/dd HH:mm')}
                    </div>
                    <div className="col-span-2 text-sm text-gray-600 truncate">
                        {item.ownerId} {/* TODO: Replace with actual user name */}
                    </div>
                    <div className="col-span-2 flex justify-end">
                        {item.type === 'file' && (
                             <button 
                                onClick={(e) => handleSummarizeClick(e, item)}
                                className="flex items-center text-sm px-2 py-1 bg-accent text-white rounded-md hover:bg-opacity-80"
                            >
                                <Bot size={16} className="mr-1" />
                                AI要約
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {currentFolderContents.length === 0 && (
                 <div className="text-center text-gray-400 mt-8">
                    <Folder size={48} className="mx-auto mb-2" />
                    <p>このフォルダは空です</p>
                </div>
            )}
            </div>
            
            {viewingFile && (
                <>
                    <DocumentViewer 
                        isOpen={docViewerOpen}
                        onClose={closeViewers}
                        file={{name: viewingFile.name ?? 'No Name', url: viewingFile.url ?? ''}} 
                    />
                    <TextViewer
                        isOpen={textViewerOpen}
                        onClose={closeViewers}
                        file={{name: viewingFile.name ?? 'No Name', url: viewingFile.url ?? ''}}
                    />
                </>
            )}
        </div>
    );
};

export default FileBrowser;
