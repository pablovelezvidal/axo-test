import React from 'react';

export interface twitterUserListItemProps {
  screenName: string;
  profileImage: string;
}

const twitterUserListItem: React.SFC<twitterUserListItemProps> = ({
  screenName,
  profileImage,
}) => {
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

export default twitterUserListItem;
