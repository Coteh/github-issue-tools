import React from 'react';
import { ExportIssues } from './ExportIssues';
import { render } from '@testing-library/react';

// TODO use jest-fetch-mock instead
// https://www.leighhalliday.com/mock-fetch-jest
// https://www.npmjs.com/package/jest-fetch-mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ Header: 'data' }]),
  }),
) as any;

describe('ExportIssues', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it('renders without crash', () => {
    render(<ExportIssues user={'test'} />);
  });
  it('loads issues list from repository when export is triggered', () => {
    fail('Not implemented');
  });
  it('performs csv download when export is triggered', () => {
    fail('Not implemented');
  });
});
