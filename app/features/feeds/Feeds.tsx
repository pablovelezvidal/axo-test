import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Feeds.css';
import routes from '../../constants/routes.json';
import { withRouter } from 'react-router-dom';

const SEARCH_URI = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const Feeds = (props: any) => {
  useEffect(() => {
    fetch(
      `${SEARCH_URI}?screen_name=${props.history.location.state?.screenName}&count=2`,
      {
        // method: 'POST',
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
      </div>
    </>
  );
};

export default withRouter(Feeds);
