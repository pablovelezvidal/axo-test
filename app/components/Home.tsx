import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Home.css';
import routes from '../constants/routes.json';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SEARCH_URI =
  'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search';

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query: any) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}`)
      .then((resp) => resp.json())
      .then((items) => {
        console.log(items);
        const options = items.map((i: any) => {
          console.log(i);
          return {
            profile_image_url_https: i.profile_image_url_https,
            id: i.id,
            screen_name: i.screen_name,
          };
        });

        setOptions(options);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <>
      <div>
        <p>Enter the Twitter User Name</p>
      </div>
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="screen_name"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        placeholder="Search for a Github user..."
        renderMenuItemChildren={(option, props) => (
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
    </>
  );
};

export default Home;
