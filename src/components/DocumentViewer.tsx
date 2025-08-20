import React from 'react';
import Modal from 'react-modal';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    name?: string;
    url?: string;
  };
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ isOpen, onClose, file }) => {
  if (!file?.url || !file?.name) {
    return null;
  }
  
  const isPdf = file.name.endsWith('.pdf');
  const viewerUrl = isPdf
    ? file.url
    : `https://view.officeapps.live.com/op/embed.aspx?ui=en-US&src=${encodeURIComponent(file.url)}`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Document Viewer"
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false} // Add this to avoid app element warning
    >
      <div className="bg-white rounded-lg w-full h-full max-w-6xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">{file.name}</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <div className="flex-1">
          <iframe
            src={viewerUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title={file.name}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DocumentViewer;
