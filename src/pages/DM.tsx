import React, { useEffect } from 'react';
import DirectMessageChat from '../components/DirectMessageChat';
import DMDetailPanel from '../components/DMDetailPanel';
import { useDM } from '../hooks/useDM';
import { useDetailPanel } from '../hooks/useDetailPanel';

const DM: React.FC = () => {
    const { selectedConversation, selectedNotification } = useDM();
    const { setPanelContent, closePanel } = useDetailPanel();

    useEffect(() => {
        if (selectedConversation || selectedNotification) {
            setPanelContent(<DMDetailPanel />);
        } else {
            closePanel();
        }
    }, [selectedConversation, selectedNotification, setPanelContent, closePanel]);

    // C画面のコンテンツを返す
    return <DirectMessageChat />;
};

export default DM;
