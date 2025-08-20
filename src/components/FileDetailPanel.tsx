import React, { useState, useEffect } from 'react';
import { useFiles } from '../hooks/useFiles';
import { useDetailPanel } from '../hooks/useDetailPanel';
import { getAISummary } from '../services/aiService';
import { X, FileText, Bot, Loader, Maximize } from 'lucide-react';
import Modal from 'react-modal';
import dummyTxtUrl from '/dummy.txt?url';
import dummyCsvUrl from '/dummy.csv?url';

const fullscreenModalStyles: Modal.Styles = {
    content: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        border: 'none',
        padding: '0',
        borderRadius: '0',
        height: '100vh',
        width: '100vw',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    }
};

const FileDetailPanel: React.FC = () => {
    const { selectedFile } = useFiles();
    const { closePanel } = useDetailPanel();
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [textContent, setTextContent] = useState('');
    const [textError, setTextError] = useState('');

    useEffect(() => {
        setSummary('');
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

    const handleSummarize = async () => {
        setIsLoading(true);
        const result = await getAISummary(name || 'untitled');
        setSummary(result);
        setIsLoading(false);
    };

    const renderFilePreview = (isModal = false) => (
        <div className={isModal ? "h-full w-full" : "h-96 border-y bg-gray-200 my-4"}>
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
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <FileText size={40} className="mr-4 text-gray-500" />
                        <div>
                            <p className="font-bold break-all">{name}</p>
                            <p className="text-sm text-gray-500">
                                更新日: {new Date(updatedAt || '').toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsFullscreen(true)} className="text-gray-500 hover:text-primary" title="全画面表示">
                        <Maximize size={18} />
                    </button>
                </div>

                {renderFilePreview()}

                <div className="mt-6">
                    <button
                        onClick={handleSummarize}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-400"
                    >
                        {isLoading ? (
                            <Loader size={20} className="animate-spin mr-2" />
                        ) : (
                            <Bot size={20} className="mr-2" />
                        )}
                        <span>{isLoading ? '要約中...' : 'AI要約を実行'}</span>
                    </button>
                </div>
                
                {summary && (
                    <div className="mt-6 p-4 bg-sub1 rounded-lg">
                        <h4 className="font-bold mb-2">AIによる要約</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isFullscreen}
                onRequestClose={() => setIsFullscreen(false)}
                style={fullscreenModalStyles}
                contentLabel="全画面プレビュー"
            >
                <div className="relative h-full w-full">
                    <button 
                        onClick={() => setIsFullscreen(false)} 
                        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                        title="閉じる"
                    >
                        <X size={24} />
                    </button>
                    {renderFilePreview(true)}
                </div>
            </Modal>
        </div>
    );
};

export default FileDetailPanel;
