import React, { useState, useEffect } from 'react';
import { Bot, MessageSquare, Paperclip, Maximize, X } from 'lucide-react';
import { FileItem } from '../mocks/data';
import Modal from 'react-modal';

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

interface HomeFileDetailPanelProps {
  file: FileItem;
}

const HomeFileDetailPanel: React.FC<HomeFileDetailPanelProps> = ({ file }) => {
    const isOfficeDoc = file.name?.endsWith('.pptx') || file.name?.endsWith('.docx') || file.name?.endsWith('.xlsx');
    const isPdf = file.name?.endsWith('.pdf');
    const isTextDoc = file.name?.endsWith('.txt') || file.name?.endsWith('.csv');
    const [textContent, setTextContent] = useState('');
    const [textError, setTextError] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (isTextDoc && file.url) {
            fetch(file.url)
                .then(res => {
                    if (!res.ok) throw new Error("File not found");
                    return res.text();
                })
                .then(setTextContent)
                .catch(() => setTextError("コンテンツの読み込みに失敗しました。"));
        }
    }, [file, isTextDoc]);

    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?ui=en-US&src=${encodeURIComponent(file.url || '')}`;

    const renderFilePreview = (isModal = false) => (
        <div className={isModal ? "h-full w-full" : "h-96 border-b bg-gray-200"}>
             {isPdf && <iframe src={file.url} width="100%" height="100%" frameBorder="0" title={file.name} />}
             {isOfficeDoc && <iframe src={officeViewerUrl} width="100%" height="100%" frameBorder="0" title={file.name} />}
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
        <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center">
                    <Paperclip size={18} className="mr-2" />
                    {file.name}
                </h3>
                <button onClick={() => setIsFullscreen(true)} className="text-gray-500 hover:text-primary" title="全画面表示">
                    <Maximize size={18} />
                </button>
            </div>
            
            <div className="flex-1 bg-sub1 overflow-y-auto">
                {/* File Viewer */}
                {renderFilePreview()}

                {/* AI Summary */}
                <div className="p-4 border-b">
                     <button className="w-full flex items-center justify-center text-sm px-3 py-2 bg-accent text-white rounded-md hover:bg-opacity-80">
                        <Bot size={16} className="mr-2" />
                        AIで要約する
                    </button>
                    <div className="mt-2 p-3 bg-white rounded-md text-sm">
                        <p className="font-bold mb-1">AIによる要約:</p>
                        <p className="text-gray-600">（ここにAIによる要約結果が表示されます）</p>
                    </div>
                </div>

                {/* Comments */}
                <div className="p-4">
                    <h4 className="font-bold mb-2 flex items-center"><MessageSquare size={16} className="mr-2"/>コメント</h4>
                    <div className="space-y-3">
                        {/* Dummy Comment */}
                        <div className="text-sm">
                            <p className="font-bold">佐藤 健</p>
                            <p className="bg-white p-2 rounded-md">この資料、とても参考になります！</p>
                        </div>
                    </div>
                     <div className="mt-4">
                        <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="コメントを追加..."></textarea>
                        <button className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded-md">投稿</button>
                    </div>
                </div>
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
}

export default HomeFileDetailPanel;
