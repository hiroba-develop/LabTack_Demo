import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface TextViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    name: string;
    url: string;
  };
}

const TextViewer: React.FC<TextViewerProps> = ({ isOpen, onClose, file }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && file.url) {
      setError(null);
      setContent('');
      fetch(file.url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(text => setContent(text))
        .catch(err => {
            console.error("Failed to fetch file content:", err)
            setError('ファイルの読み込みに失敗しました。')
        });
    }
  }, [isOpen, file.url]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Text Viewer"
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg w-full h-full max-w-4xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">{file.name}</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm">{content}</pre>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TextViewer;
