import React from 'react';

const TweetBox = (props: any) => {
  return <div className="tweet-body">{props.children}</div>;
};

const Image = (props: any) => {
  return <img src={props.image} alt="Logo" className="picture"></img>;
};

const Date = (props: any) => {
  return <div className="date">{props.date}</div>;
};

const Name = (props: any) => {
  return <div className="name">{props.name}</div>;
};

const TweetBody = (props: any) => {
  return <div className="tweet">{props.tweet}</div>;
};

const Tweet = (props: any) => {
  return (
    <TweetBox>
      <div className="inner-body">
        <Image image={props.image} />
        <div className="body">
          <div className="inner-body">
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
