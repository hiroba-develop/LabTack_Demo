import React, { useEffect } from 'react';
import DirectMessageChat from '../components/DirectMessageChat';
import { useDetailPanel } from '../hooks/useDetailPanel';

const DM: React.FC = () => {
    const { closePanel } = useDetailPanel();

    useEffect(() => {
        // DM画面では詳細パネルを常に閉じる
        closePanel();
    }, [closePanel]);

    // C画面のコンテンツを返す
    return <DirectMessageChat />;
};

export default DM;
