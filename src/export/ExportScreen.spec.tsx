import React from 'react';
import { ExportScreen } from './ExportScreen';
import { render } from '@testing-library/react';

describe('ExportScreen', () => {
  it('renders without crash', () => {
    render(
      <ExportScreen handleExport={() => {}} repoNames={[]} loading={false} />,
    );
  });
  it('displays repository names in dropdown', () => {
    fail('Not implemented');
  });
  it("displays 'loading repositories' text when loading repositories", () => {
    fail('Not implemented');
  });
  it("displays 'please select' text when repositories are loaded", () => {
    fail('Not implemented');
  });
  it('displays export button', () => {
    fail('Not implemented');
  });
  it('invokes handle export callback when export button is clicked', () => {
    fail('Not implemented');
  });
});
