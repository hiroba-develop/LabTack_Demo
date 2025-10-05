import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, MessageSquare } from 'lucide-react';
import type { User } from '../mocks/data';

interface MemberProfileProps {
  member: User;
  onClose: () => void;
}

const MemberProfile: React.FC<MemberProfileProps> = ({ member, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'オンライン';
      case 'away': return '離席中';
      case 'busy': return '取り込み中';
      default: return 'オフライン';
    }
  };

  return (
    <div className="bg-white border-l border-border h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text">プロフィール</h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* プロフィール内容 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* プロフィール画像と基本情報 */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <img 
              src={member.avatarUrl} 
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(member.status)}`}></div>
          </div>
          <h3 className="text-xl font-bold text-text mb-1">{member.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{getStatusText(member.status)}</p>
          <p className="text-sm text-gray-600">ID: {member.id}</p>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <MessageSquare size={16} />
            <span>メッセージ</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-border text-text rounded-lg hover:bg-gray-50 transition-colors">
            <Mail size={16} />
            <span>メール</span>
          </button>
        </div>

        {/* 詳細情報 */}
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">連絡先情報</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-600">{member.id}@labtack.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-600">090-1234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-600">東京都渋谷区</span>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">活動情報</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-600">参加日: 2024年1月15日</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MessageSquare size={16} className="text-gray-400" />
                <span className="text-gray-600">最終アクティブ: 2時間前</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">自己紹介</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {member.id === 'user-0' 
                ? 'こんにちは！このプロジェクトのメンバーです。よろしくお願いします。'
                : 'こんにちは！研究活動に参加しています。一緒に頑張りましょう！'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;


