import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Feeds.css';
import routes from '../../constants/routes.json';

const Feeds = () => {
  return (
    <>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <p>Tweets from the user : USER</p>
    </>
  );
};

export default Feeds;
