import { AnyAction } from 'redux';
import feedsReducer, {
  increment,
  decrement,
} from '../../app/features/feeds/feedsSlice';

describe('reducers', () => {
  describe('feeds', () => {
    it('should handle initial state', () => {
      expect(feedsReducer(undefined, {} as AnyAction)).toMatchSnapshot();
    });

    it('should handle INCREMENT_FEEDS', () => {
      expect(feedsReducer({ value: 1 }, { type: increment })).toMatchSnapshot();
    });

    it('should handle DECREMENT_FEEDS', () => {
      expect(feedsReducer({ value: 1 }, { type: decrement })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(feedsReducer({ value: 1 }, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
