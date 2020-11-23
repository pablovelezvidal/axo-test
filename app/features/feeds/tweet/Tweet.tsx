import React from 'react';
import styles from './Tweet.css';

const TweetBox = (props: any) => {
  return <div className={styles.tweetBody}>{props.children}</div>;
};

const Image = (props: any) => {
  return <img src={props.image} alt="Logo" className={styles.picture} />;
};

const Date = (props: any) => {
  return <div className={styles.date}>{props.date}</div>;
};

const Name = (props: any) => {
  return <div className={styles.name}>{props.name}</div>;
};

const TweetBody = (props: any) => {
  return <div className={styles.tweet}>{props.tweet}</div>;
};

const Tweet = (props: any) => {
  return (
    <TweetBox>
      <div className={styles.innerBody}>
        <Image image={props.image} />
        <div className={styles.body}>
          <div className={styles.innerBody}>
            <Name name={props.name} />
            <Date date={props.date} />
          </div>
          <TweetBody tweet={props.tweet} />
        </div>
      </div>
    </TweetBox>
  );
};

export default Tweet;
