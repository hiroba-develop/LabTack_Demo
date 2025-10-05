import React from 'react';

type UserStatus = 'online' | 'offline' | 'away' | 'busy';

interface AvatarProps {
  avatarUrl?: string;
  name?: string;
  status?: UserStatus;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl, name, status, size = 40 }) => {
  const badgeSize = size / 3.5;
  const badgePosition = size / 14;

  const getStatusColor = (status?: UserStatus) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusTitle = (status?: UserStatus) => {
    switch (status) {
      case 'online': return 'オンライン';
      case 'away': return '離席中';
      case 'busy': return '取り込み中';
      default: return 'オフライン';
    }
  };

  return (
    <div className="relative inline-block flex-shrink-0">
      <img
        src={avatarUrl || `https://ui-avatars.com/api/?name=${name || ''}&background=random`}
        alt={name || 'avatar'}
        className="rounded-full object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${getStatusColor(status)}`}
          style={{
            width: `${badgeSize}px`,
            height: `${badgeSize}px`,
            right: `${badgePosition}px`,
            bottom: `${badgePosition}px`,
          }}
          title={getStatusTitle(status)}
        />
      )}
    </div>
  );
};

export default Avatar;
