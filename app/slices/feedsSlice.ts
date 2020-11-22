import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from '../store';

const SEARCH_URI = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
const BEARER_TOKEN = process.env.BEARER_TOKEN;

type State = {
  loading: boolean;
  hasErrors: boolean;
  feeds: Array<any>;
};

const initialState: State = {
  loading: false,
  hasErrors: false,
  feeds: [],
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  reducers: {
    getFeeds: (state) => {
      state.loading = true;
    },
    getFeedsSuccess: (state, { payload }) => {
      state.feeds = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getFeedsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getFeeds,
  getFeedsSuccess,
  getFeedsFailure,
} = feedsSlice.actions;

export const feedsSelector = (state: State): any => state.feeds;

// Asynchronous thunk action
export const fetchFeeds = (
  screenName: string,
  quantity: number = 10
): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(getFeeds());

    try {
      const response = await fetch(
        `${SEARCH_URI}?screen_name=${screenName}&count=${quantity}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      dispatch(getFeedsSuccess(data));
    } catch (error) {
      dispatch(getFeedsFailure());
    }
  };
};

export default feedsSlice.reducer;
