import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useCalendar } from '../hooks/useCalendar';
import { mockUsers } from '../mocks/data';
import { EditingEvent } from './CalendarContext';
import { format } from 'date-fns';

const customStyles: Modal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    }
};


const EventEditorModal: React.FC = () => {
    const { 
        isEventModalOpen, setIsEventModalOpen, selectedEvent, 
        addEvent, updateEvent, deleteEvent, setSelectedEvent 
    } = useCalendar();

    const [formData, setFormData] = useState<EditingEvent | null>(null);

    useEffect(() => {
        if(selectedEvent) {
            const formatIfDate = (date: Date | undefined) => date ? format(new Date(date), "yyyy-MM-dd'T'HH:mm") : "";
            
            setFormData({
                ...selectedEvent,
                start: formatIfDate(selectedEvent.start) as any,
                end: formatIfDate(selectedEvent.end) as any,
            });
        } else {
            setFormData(null);
        }
    }, [selectedEvent]);

    const handleClose = () => {
        setIsEventModalOpen(false);
        setSelectedEvent(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleParticipantChange = (userId: string) => {
        if (!formData) return;
        const currentParticipants = formData.participantIds || [];
        const newParticipants = currentParticipants.includes(userId)
            ? currentParticipants.filter(id => id !== userId)
            : [...currentParticipants, userId];
        setFormData({ ...formData, participantIds: newParticipants });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        const eventData = {
            ...formData,
            start: new Date(formData.start),
            end: new Date(formData.end),
        };
        
        if (formData.id) {
            updateEvent(eventData);
        } else {
            addEvent(eventData);
        }
        handleClose();
    };

    const handleDelete = () => {
        if (formData?.id) {
            deleteEvent(formData.id);
            handleClose();
        }
    };
    
    return (
        <Modal
            isOpen={isEventModalOpen}
            onRequestClose={handleClose}
            style={customStyles}
            contentLabel="予定の編集"
        >
            {formData && (
                <form onSubmit={handleSubmit} className="p-4">
                    <h2 className="text-xl font-bold mb-4">{formData.id ? '予定の編集' : '新しい予定'}</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-semibold">タイトル</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">開始日時</label>
                            <input
                                type="datetime-local"
                                name="start"
                                value={formData.start as any}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">終了日時</label>
                            <input
                                type="datetime-local"
                                name="end"
                                value={formData.end as any}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">詳細</label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded h-24"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">参加者</label>
                             <div className="space-y-2">
                                {Object.values(mockUsers).map(user => (
                                    <div key={user.id} className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id={`modal-user-${user.id}`} 
                                            checked={formData.participantIds?.includes(user.id!) || false}
                                            onChange={() => handleParticipantChange(user.id!)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`modal-user-${user.id}`}>{user.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <div>
                            {formData.id && (
                                <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800">
                                    削除
                                </button>
                            )}
                        </div>
                        <div className="space-x-2">
                            <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                キャンセル
                            </button>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
                                保存
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default EventEditorModal;
