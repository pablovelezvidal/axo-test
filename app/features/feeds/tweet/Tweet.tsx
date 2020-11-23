import React, { ReactElement, ReactNode } from 'react';
import styles from './Tweet.css';

type TweetProps = {
  image: string;
  name: string;
  date: string;
  tweet: string;
};

const TweetBox: React.FC = ({ children }) => {
  return <div className={styles.tweetBody}>{children}</div>;
};

const Image: React.FC<{ image: string }> = ({ image }: { image: string }) => {
  return <img src={image} alt="Logo" className={styles.picture} />;
};

const Date: React.FC<{ date: string }> = ({ date }: { date: string }) => {
  return <div className={styles.date}>{date}</div>;
};

const Name: React.FC<{ name: string }> = ({ name }: { name: string }) => {
  return <div className={styles.name}>{name}</div>;
};

const TweetBody: React.FC<{ tweet: string }> = ({
  tweet,
}: {
  tweet: string;
}) => {
  return <div className={styles.tweet}>{tweet}</div>;
};

const Tweet: React.FC<TweetProps> = ({
  image,
  name,
  date,
  tweet,
}: TweetProps) => {
  return (
    <TweetBox>
      <div className={styles.innerBody}>
        <Image image={image} />
        <div className={styles.body}>
          <div className={styles.innerBody}>
            <Name name={name} />
            <Date date={date} />
          </div>
          <TweetBody tweet={tweet} />
        </div>
      </div>
    </TweetBox>
  );
};

export default Tweet;
