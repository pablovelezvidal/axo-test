import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

export interface QuantitySelectorProps {}

const handleChange = (event: any) => {
  console.log('the value', event.target.value);
};

const QuantitySelector: React.SFC<QuantitySelectorProps> = () => {
  const dispatch = useDispatch();

  return (
    <select
      onChange={handleChange}
      className="browser-default custom-select"
      defaultValue="50"
    >
      <option value="10">Load 10 Tweets</option>
      <option value="20">Load 20 Tweets</option>
      <option value="50">Load 50 Tweets</option>s
    </select>
  );
};

export default QuantitySelector;
