/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpack
const LazyFeedsPage = React.lazy(() =>
  import(/* webpackChunkName: "FeedsPage" */ './containers/FeedsPage')
);

const FeedsPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyFeedsPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.FEEDS} component={FeedsPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
