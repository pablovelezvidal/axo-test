import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Feeds.css';
import routes from '../../constants/routes.json';
import { withRouter } from 'react-router-dom';

const Feeds = (props: any) => {
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
