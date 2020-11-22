import { AnyAction } from 'redux';
import feedsReducer, {
  getFeedsFailure,
  getFeeds,
  getFeedsSuccess,
} from '../../app/slices/feedsSlice';

describe('reducers', () => {
  describe('feeds', () => {
    it('should handle initial state', () => {
      expect(feedsReducer(undefined, {} as AnyAction)).toMatchSnapshot();
    });

    it('should handle getFeedsFailure', () => {
      expect(
        feedsReducer(undefined, { type: getFeedsFailure })
      ).toMatchSnapshot();
    });

    it('should handle getFeeds', () => {
      expect(feedsReducer(undefined, { type: getFeeds })).toMatchSnapshot();
    });

    it('should handle getFeedsSuccess', () => {
      expect(
        feedsReducer(
          {
            loading: false,
            feeds: [],
            hasErrors: false,
          },
          {
            type: getFeedsSuccess,
            payload: [
              { id: 1, text: '1' },
              { id: 2, text: '2' },
            ],
          }
        )
      ).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(
        feedsReducer(
          { loading: true, feeds: [], hasErrors: false },
          { type: 'unknown' }
        )
      ).toMatchSnapshot();
    });
  });
});
