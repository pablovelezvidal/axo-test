/* eslint react/jsx-props-no-spreading: off, @typescript-eslint/ban-ts-comment: off */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Feeds from '../../../app/features/feeds/Feeds';
import * as feedsSlice from '../../../app/features/feeds/feedsSlice';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

function setup(
  preloadedState: { feeds: { value: number } } = { feeds: { value: 1 } }
) {
  const store = configureStore({
    reducer: { feeds: feedsSlice.default },
    preloadedState,
  });

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router>
          <Feeds />
        </Router>
      </Provider>
    );
  const component = getWrapper();
  return {
    store,
    component,
    buttons: component.find('button'),
    p: component.find('.feeds'),
  };
}

describe('Feeds component', () => {
  it('should should display count', () => {
    const { p } = setup();
    expect(p.text()).toMatch(/^1$/);
  });

  it('should first button should call increment', () => {
    const { buttons } = setup();
    const incrementSpy = jest.spyOn(feedsSlice, 'increment');

    buttons.at(0).simulate('click');
    expect(incrementSpy).toBeCalled();
    incrementSpy.mockRestore();
  });

  it('should match exact snapshot', () => {
    const { store } = setup();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Feeds />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should second button should call decrement', () => {
    const { buttons } = setup();
    const decrementSyp = jest.spyOn(feedsSlice, 'decrement');
    buttons.at(1).simulate('click');
    expect(decrementSyp).toBeCalled();
    decrementSyp.mockRestore();
  });

  it('should third button should call incrementIfOdd', () => {
    const { buttons } = setup();
    const incrementIfOdd = jest.spyOn(feedsSlice, 'incrementIfOdd');
    buttons.at(2).simulate('click');
    expect(incrementIfOdd).toBeCalled();
    incrementIfOdd.mockRestore();
  });

  it('should fourth button should call incrementAsync', () => {
    const { buttons } = setup();
    const incrementAsync = jest.spyOn(feedsSlice, 'incrementAsync');
    buttons.at(3).simulate('click');
    expect(incrementAsync).toBeCalled();
    incrementAsync.mockRestore();
  });

  it('should display updated count after increment button click', () => {
    const { buttons, p } = setup();
    buttons.at(0).simulate('click');
    expect(p.text()).toMatch(/^2$/);
  });

  it('should display updated count after decrement button click', () => {
    const { buttons, p } = setup();
    buttons.at(1).simulate('click');
    expect(p.text()).toMatch(/^0$/);
  });

  it('shouldnt change if even and if odd button clicked', () => {
    const { buttons, p } = setup({ feeds: { value: 2 } });
    buttons.at(2).simulate('click');
    expect(p.text()).toMatch(/^2$/);
  });

  it('should change if odd and if odd button clicked', () => {
    const { buttons, p } = setup({ feeds: { value: 1 } });
    buttons.at(2).simulate('click');
    expect(p.text()).toMatch(/^2$/);
  });
});

describe('Test feeds actions', () => {
  it('should not call incrementAsync before timer', () => {
    const fn = feedsSlice.incrementAsync(1000);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = jest.fn();
    // @ts-ignore
    fn(dispatch);
    jest.advanceTimersByTime(500);
    expect(dispatch).not.toBeCalled();
  });

  it('should call incrementAsync after timer', () => {
    const fn = feedsSlice.incrementAsync(1000);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = jest.fn();
    // @ts-ignore
    fn(dispatch);
    jest.advanceTimersByTime(1001);
    expect(dispatch).toBeCalled();
  });
});
