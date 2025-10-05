import React, { useState } from 'react';
import { useHome } from '../hooks/useHome';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Hash, PlusCircle } from 'lucide-react';
import type { components } from '../types/api';
import AddChannelModal from './AddChannelModal';

type Channel = components['schemas']['Channel'];

const ChannelItem: React.FC<{ channel: Channel; isSubItem?: boolean }> = ({ channel, isSubItem = false }) => {
    const { selectedChannelId, setSelectedChannelId } = useHome();
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isSelected = channel.id === selectedChannelId;

    const handleSelect = () => {
        if(channel.type !== 'directory') {
            setSelectedChannelId(channel.id ?? null);
            // メンバーページにいる場合はホーム画面に戻る
            if(location.pathname === '/members') {
                navigate('/');
            }
        }
    };

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };
    
    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    }

    if (channel.type === 'directory') {
        return (
            <div>
                <div 
                    className="flex items-center p-2 text-sm text-gray-600 hover:bg-sub1 rounded-md cursor-pointer group"
                    onClick={toggleExpand}
                >
                    <ChevronDown size={16} className={`mr-1 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                    <span className="font-semibold flex-1">{channel.name}</span>
                    <button onClick={openModal} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlusCircle size={14} />
                    </button>
                </div>
                {isExpanded && (
                    <div className="pl-4">
                        {channel.children?.map(child => <ChannelItem key={child.id} channel={child} isSubItem={true} />)}
                    </div>
                )}
                <AddChannelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} parentId={channel.id ?? null} />
            </div>
        )
    }

    return (
        <div 
            className={`flex items-center p-2 text-sm rounded-md cursor-pointer ${isSubItem ? 'pl-5' : ''} ${isSelected ? 'bg-primary text-white font-bold' : 'text-text hover:bg-sub1'}`}
            onClick={handleSelect}
        >
            <Hash size={16} className="mr-2" />
            <span>{channel.name}</span>
        </div>
    );
};


const ChannelList: React.FC = () => {
  const { channels } = useHome();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-2">
        <div className="flex justify-between items-center px-2 py-1">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Channels</h3>
            <button onClick={() => setIsModalOpen(true)} className="text-gray-400 hover:text-gray-700">
                <PlusCircle size={16} />
            </button>
        </div>
        {channels.map(channel => <ChannelItem key={channel.id} channel={channel} />)}
        <AddChannelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} parentId={null} />
    </div>
  );
};

export default ChannelList;
