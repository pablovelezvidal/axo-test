import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Feeds.css';
import routes from '../../constants/routes.json';
import { withRouter } from 'react-router-dom';
import Tweet from './tweet/tweet';

import QuantitySelector from './quantitySelector/QuantitySelector';

import { fetchFeeds, feedsSelector } from '../../slices/feedsSlice';
import { usersSelector } from '../../slices/usersSlice';

const Feeds = (): JSX.Element => {
  const dispatch = useDispatch();

  const { feeds, loading, hasErrors } = useSelector(feedsSelector);
  const { userSelected } = useSelector(usersSelector);

  useEffect(() => {
    dispatch(fetchFeeds(userSelected));
  }, []);

  const renderFeeds = () => {
    if (loading) return <p>Loading feeds...</p>;
    if (hasErrors || !feeds)
      return (
        <p>
          There was an error fetching the feeds... Have you set the Bearer Token
          as stated in the instructions?
        </p>
      );

    return feeds.map((tweet: any, index: number | string) => {
      return (
        <Tweet
          name={tweet.user.name}
          tweet={tweet.text}
          date={tweet.created_at}
          image={tweet.user.profile_image_url_https}
          key={index + '-' + tweet.id}
        ></Tweet>
      );
    });
  };

  return (
    <>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={styles.quantitySelector}>
        <QuantitySelector></QuantitySelector>
      </div>
      <div className={styles.container}>
        <p className="user-title">Tweets from the user : {userSelected}</p>
        {renderFeeds()}
      </div>
    </>
  );
};

export default withRouter(Feeds);
