import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchFeeds } from '../../../slices/feedsSlice';
import { usersSelector } from '../../../slices/usersSlice';

const QuantitySelector: React.FC<Record<string, unknown>> = () => {
  const dispatch = useDispatch();
  const { userSelected } = useSelector(usersSelector);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(fetchFeeds(userSelected, +event.target.value));
  };

  return (
    <select
      onChange={handleChange}
      className="browser-default custom-select"
      defaultValue="10"
    >
      <option value="10">Load 10 Tweets</option>
      <option value="20">Load 20 Tweets</option>
      <option value="50">Load 50 Tweets</option>
    </select>
  );
};

export default QuantitySelector;
