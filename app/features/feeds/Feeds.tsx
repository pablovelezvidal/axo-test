import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Feeds.css';
import routes from '../../constants/routes.json';
import { withRouter } from 'react-router-dom';
import Tweet from '../tweet/tweet';

const SEARCH_URI = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const Feeds = (props: any) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    fetch(
      `${SEARCH_URI}?screen_name=${props.history.location.state?.screenName}&count=2`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((items) => {
        console.log(items);
        setTweets(items);
      });
  }, []);
  return (
    <>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={styles.container}>
        <p>Tweets from the user : {props.history.location.state?.screenName}</p>
        {tweets.map((tweet: any, index) => {
          return (
            <Tweet
              name={tweet.user.name}
              tweet={tweet.text}
              date={tweet.created_at}
              image={tweet.user.profile_image_url_https}
              key={index + '-' + tweet.id}
            ></Tweet>
          );
        })}
      </div>
    </>
  );
};

export default withRouter(Feeds);
