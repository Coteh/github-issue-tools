import React from 'react';
import { ExportScreen } from './ExportScreen';
import { render } from '@testing-library/react';
import { RepositorySelect } from '../input/RepositorySelect';

describe('ExportScreen', () => {
  it('renders without crash', () => {
    render(
      <ExportScreen
        handleExport={() => {}}
        RepoSelect={<RepositorySelect repoNames={[]} loading={false} />}
      />,
    );
  });
  it('displays export button', () => {
    fail('Not implemented');
  });
  it('invokes handle export callback when export button is clicked', () => {
    fail('Not implemented');
  });
});
