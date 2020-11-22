import feedsReducer from './feedsSlice';
import usersReducer from './usersSlice';

const reducers = {
  feeds: feedsReducer,
  users: usersReducer,
};

export default reducers;
