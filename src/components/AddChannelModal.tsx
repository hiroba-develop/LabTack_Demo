import React, { useState } from 'react';
import Modal from 'react-modal';
import { useHome } from '../hooks/useHome';

interface AddChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
    parentId: string | null;
}

const AddChannelModal: React.FC<AddChannelModalProps> = ({ isOpen, onClose, parentId }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<'directory' | 'file_link'>('file_link');
    const { addChannel } = useHome();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        addChannel(name, type, parentId);
        onClose();
        setName('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Channel"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-transparent"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <h2 className="text-lg font-bold mb-4">{parentId ? '項目を追加' : 'チャンネルまたはディレクトリを追加'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder={type === 'file_link' ? 'チャンネル名' : 'ディレクトリ名'}
                        />
                    </div>
                    {!parentId && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as 'directory' | 'file_link')}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="file_link">チャンネル</option>
                                <option value="directory">ディレクトリ</option>
                            </select>
                        </div>
                    )}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">キャンセル</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">作成</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddChannelModal;
