import React from 'react';
import { render } from '@testing-library/react';

import { Auth } from './Auth';

// TODO use jest-fetch-mock instead
// https://www.leighhalliday.com/mock-fetch-jest
// https://www.npmjs.com/package/jest-fetch-mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ Header: 'data' }]),
  }),
) as any;

describe('Auth', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it('renders without crash', () => {
    render(<Auth handleAuthGranted={() => {}} />);
  });
  it('should show the authenticate with GitHub button', () => {
    const { getByText } = render(<Auth handleAuthGranted={() => {}} />);

    getByText(/with GitHub/);
  });
  it('should redirect user to GitHub auth page', () => {
    fail('Not implemented');
  });
  it('should perform a request to get auth token once auth granted', () => {
    fail('Not implemented');
  });
  it('should complete auth phase once auth token is obtained', () => {
    fail('Not implemented');
  });
  it('should provide an error message when error getting auth token', () => {
    fail('Not implemented');
  });
  it('should hide the auth button once user is authenticated', () => {
    fail('Not implemented');
  });
});
