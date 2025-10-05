import React, { useState, useEffect } from 'react';
import { useFiles } from '../hooks/useFiles';
import { useDetailPanel } from '../hooks/useDetailPanel';
import { X, FileText } from 'lucide-react';
import dummyTxtUrl from '/dummy.txt?url';
import dummyCsvUrl from '/dummy.csv?url';

const FileDetailPanel: React.FC = () => {
    const { selectedFile } = useFiles();
    const { closePanel } = useDetailPanel();
    const [textContent, setTextContent] = useState('');
    const [textError, setTextError] = useState('');

    useEffect(() => {
        setTextContent('');
        setTextError('');
        if (selectedFile?.url && (selectedFile.name?.endsWith('.txt') || selectedFile.name?.endsWith('.csv'))) {
            let fileUrl = selectedFile.url;
            if (selectedFile.name === '会議メモ.txt') {
                fileUrl = dummyTxtUrl;
            } else if (selectedFile.name === '20240722_results.csv') {
                fileUrl = dummyCsvUrl;
            }

            fetch(fileUrl)
                .then(res => {
                    if (!res.ok) throw new Error("File not found");
                    return res.text();
                })
                .then(setTextContent)
                .catch(() => setTextError("コンテンツの読み込みに失敗しました。"));
        }
    }, [selectedFile]);

    if (!selectedFile) {
        return null;
    }

    const { name, updatedAt, url } = selectedFile;
    const isOfficeDoc = name?.endsWith('.pptx') || name?.endsWith('.docx') || name?.endsWith('.xlsx');
    const isPdf = name?.endsWith('.pdf');
    const isTextDoc = name?.endsWith('.txt') || name?.endsWith('.csv');
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?ui=en-US&src=${encodeURIComponent(url || '')}`;

    const renderFilePreview = () => (
        <div className="h-96 border-y bg-gray-200 my-4">
             {isPdf && <iframe src={url} width="100%" height="100%" frameBorder="0" title={name} />}
             {isOfficeDoc && <iframe src={officeViewerUrl} width="100%" height="100%" frameBorder="0" title={name} />}
             {isTextDoc && (
                 <div className="p-4 h-full overflow-y-auto bg-white">
                     {textError ? <p className="text-red-500">{textError}</p> : <pre className="text-sm whitespace-pre-wrap">{textContent}</pre>}
                 </div>
             )}
             {!isOfficeDoc && !isPdf && !isTextDoc && (
                 <div className="p-4 text-center text-gray-500 flex items-center justify-center h-full">
                     <p>プレビューに対応していないファイル形式です。</p>
                 </div>
             )}
        </div>
    );
    
    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-bold text-primary">ファイル詳細</h3>
                <button onClick={closePanel} className="p-1 rounded-full hover:bg-gray-200">
                    <X size={20} />
                </button>
            </header>
            
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-center mb-4">
                    <FileText size={40} className="mr-4 text-gray-500" />
                    <div>
                        <p className="font-bold break-all">{name}</p>
                        <p className="text-sm text-gray-500">
                            更新日: {new Date(updatedAt || '').toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {renderFilePreview()}
            </div>
        </div>
    );
};

export default FileDetailPanel;
