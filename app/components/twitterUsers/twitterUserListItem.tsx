import React from 'react';

export interface TwitterUserListItemProps {
  screenName: string;
  profileImage: string;
}

const TwitterUserListItem: React.FC<TwitterUserListItemProps> = ({
  screenName,
  profileImage,
}: TwitterUserListItemProps) => {
  return (
    <>
      <img
        alt={screenName}
        src={profileImage}
        style={{
          height: '24px',
          marginRight: '10px',
          width: '24px',
        }}
      />
      <span>{screenName}</span>
    </>
  );
};

export default TwitterUserListItem;
