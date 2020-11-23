import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import styles from './Home.css';
import routes from '../constants/routes.json';
import {
  fetchUsers,
  usersSelector,
  setUserSelected,
} from '../slices/usersSlice';

import TwitterUserListItem from './twitterUsers/TwitterUserListItem';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const Home = (props: any): JSX.Element => {
  const typeahead = React.createRef<AsyncTypeahead<any>>();
  const dispatch = useDispatch();
  const { users, isLoading, hasErrors } = useSelector(usersSelector);

  useEffect(() => {
    typeahead?.current?.focus();
  }, []);

  const handleSearch = (query: string) => {
    dispatch(fetchUsers(query));
  };

  const handleSelected = (selected: Array<{ screen_name: string }>) => {
    dispatch(setUserSelected(selected[0].screen_name));
    props.history.push({
      pathname: routes.FEEDS,
    });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <div className={styles.container}>
      {hasErrors && <p>There was a problem loading the users!</p>}
      <div className="main-title">
        <p>Type a user name, select it from the list and see the feeds!</p>
      </div>
      <AsyncTypeahead
        ref={typeahead}
        delay={1000}
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="screen_name"
        minLength={3}
        onSearch={handleSearch}
        onChange={(selected: any) => {
          handleSelected(selected);
        }}
        options={users}
        placeholder="Search for a Twitter user ..."
        renderMenuItemChildren={(option) => (
          <TwitterUserListItem
            screenName={option.screen_name}
            profileImage={option.profile_image_url_https}
          />
        )}
      />
    </div>
  );
};

export default withRouter(Home);
