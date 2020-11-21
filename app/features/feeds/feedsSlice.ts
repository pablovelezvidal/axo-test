import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = feedsSlice.actions;

export const incrementIfOdd = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.feeds.value % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
};

export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export default feedsSlice.reducer;

export const selectCount = (state: RootState) => state.feeds.value;
