import React from 'react';
import ReactDOM from 'react-dom';
import LiME from './LiME';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LiME />, div);
});
