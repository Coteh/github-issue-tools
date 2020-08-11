import React from 'react';
import { render } from '@testing-library/react';

import { TabMenu } from './TabMenu';
import { BrowserRouter as Router } from 'react-router-dom';

describe('TabMenu', () => {
  it('renders without crash', () => {
    render(
      <Router>
        <TabMenu />
      </Router>,
    );
  });
  it('renders with default tab selected', () => {
    fail('Not implemented');
  });
  it('can switch to another tab when clicked', () => {
    fail('Not implemented');
  });
  it('switches focused tab when another tab is selected', () => {
    fail('Not implemented');
  });
});
