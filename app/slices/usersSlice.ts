import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from '../store';

const SEARCH_URI =
  'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search';

type State = {
  isLoading: boolean;
  hasErrors: boolean;
  users: Array<any>;
};

const initialState: State = {
  isLoading: false,
  hasErrors: false,
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    getUsers: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getUsersFailure: (state) => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
} = usersSlice.actions;

export const usersSelector = (state: State): any => state.users;

// Asynchronous thunk action
export const fetchUsers = (query: string): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(getUsers());

    try {
      const response = await fetch(`${SEARCH_URI}?q=${query}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const items = await response.json();
      const users = items.map((i: any) => {
        return {
          profile_image_url_https: i.profile_image_url_https,
          id: i.id,
          screen_name: i.screen_name,
        };
      });
      dispatch(getUsersSuccess(users));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
};

export default usersSlice.reducer;
