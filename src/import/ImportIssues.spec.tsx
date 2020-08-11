import React from 'react';
import { ImportIssues } from './ImportIssues';
import { render } from '@testing-library/react';

// TODO use jest-fetch-mock instead
// https://www.leighhalliday.com/mock-fetch-jest
// https://www.npmjs.com/package/jest-fetch-mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ Header: 'data' }]),
  }),
) as any;

describe('ImportIssues', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it('renders without crash', () => {
    render(<ImportIssues user={'test'} />);
  });
  it('loads csv file when import action is invoked', () => {
    fail('Not implemented');
  });
  it('displays error if import action is invoked but error loading csv file', () => {
    fail('Not implemented');
  });
  it('displays error if import action is invoked but error parsing csv file', () => {
    fail('Not implemented');
  });
  it('displays error if import action is invoked but error importing csv contents to GitHub', () => {
    fail('Not implemented');
  });
});
