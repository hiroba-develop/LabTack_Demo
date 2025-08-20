import React from 'react';

type UserStatus = 'online' | 'offline';

interface AvatarProps {
  avatarUrl?: string;
  name?: string;
  status?: UserStatus;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl, name, status, size = 40 }) => {
  const badgeSize = size / 3.5;
  const badgePosition = size / 14;

  const statusColor = status === 'online' ? 'bg-green-500' : 'bg-gray-400';

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
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${statusColor}`}
          style={{
            width: `${badgeSize}px`,
            height: `${badgeSize}px`,
            right: `${badgePosition}px`,
            bottom: `${badgePosition}px`,
          }}
          title={status === 'online' ? '在籍中' : '退室中'}
        />
      )}
    </div>
  );
};

export default Avatar;
