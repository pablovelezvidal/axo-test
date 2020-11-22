/* eslint react/jsx-props-no-spreading: off, @typescript-eslint/ban-ts-comment: off */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import QuantitySelector from '../../../app/features/feeds/quantitySelector/QuantitySelector';
import * as usersSlice from '../../../app/slices/usersSlice';

Enzyme.configure({ adapter: new Adapter() });

function setup(
  preloadedState: any = {
    users: {
      isLoading: false,
      hasErrors: false,
      users: [],
      userSelected: 'User Selected',
    },
  }
) {
  const store = configureStore({
    reducer: { users: usersSlice.default },
    preloadedState,
  });

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router>
          <QuantitySelector />
        </Router>
      </Provider>
    );
  const component = getWrapper();
  return {
    store,
    component,
    select: component.find('select'),
  };
}

describe('quantity selector component should have default value of 10', () => {
  const { select } = setup();

  it('should display the title according to the user selected', () => {
    expect(select.props().defaultValue).toMatch(/^10$/);
  });

  it('should match exact snapshot', () => {
    const { store } = setup();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <QuantitySelector />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
