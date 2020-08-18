import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { RouterTabMenu } from './RouterTabMenu';

describe('RouterTabMenu', () => {
  it('renders without crash', () => {
    render(
      <BrowserRouter>
        <RouterTabMenu tabData={[]} />
      </BrowserRouter>,
    );
  });
  it('indicates selected tab based on current location in router', () => {
    fail('Not implemented');
  });
  it('updates route when link is clicked', () => {
    fail('Not implemented');
  });
});
