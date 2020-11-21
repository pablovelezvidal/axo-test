import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Home.css';
import routes from '../constants/routes.json';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SEARCH_URI =
  'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search';

const Home = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const typeahead = React.createRef<AsyncTypeahead<any>>();
  useEffect(() => {
    typeahead?.current?.focus();
  }, []);

  const handleSearch = (query: any) => {
    props.history.push({
      pathname: routes.FEEDS,
      state: { screenName: 'AlvaroUribeVel' },
    });
    // setIsLoading(true);

    // fetch(`${SEARCH_URI}?q=${query}`)
    //   .then((resp) => resp.json())
    //   .then((items) => {
    //     const options = items.map((i: any) => {
    //       return {
    //         profile_image_url_https: i.profile_image_url_https,
    //         id: i.id,
    //         screen_name: i.screen_name,
    //       };
    //     });

    //     setOptions(options);
    //     setIsLoading(false);
    //   });
  };

  const handleSelected = (selected: Array<{ screen_name: string }>) => {
    console.log(selected);
    props.history.push({
      pathname: routes.FEEDS,
      state: { screenName: selected[0].screen_name },
    });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <div className={styles.container}>
      <div>
        <p>Type a user name, select it from the list and see the feeds!</p>
      </div>
      <AsyncTypeahead
        ref={typeahead}
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="screen_name"
        minLength={3}
        onSearch={handleSearch}
        onChange={(selected: any) => {
          handleSelected(selected);
        }}
        options={options}
        placeholder="Search for a Twitter user ..."
        renderMenuItemChildren={(option) => (
          <>
            <img
              alt={option.screen_name}
              src={option.profile_image_url_https}
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <span>{option.screen_name}</span>
          </>
        )}
      />
    </div>
  );
};

export default withRouter(Home);
