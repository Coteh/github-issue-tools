import React from 'react';
import { ImportScreen } from './ImportScreen';
import { render } from '@testing-library/react';

describe('ImportScreen', () => {
  it('renders without crash', () => {
    render(<ImportScreen handleImport={() => {}} handleImportMap={() => {}} />);
  });
  it('displays a file selector to select file to import', () => {
    fail('Not implemented');
  });
  it('displays import mapping when file is selected', () => {
    fail('Not implemented');
  });
  it('displays import button', () => {
    fail('Not implemented');
  });
  it('perform import callback when import button is clicked', () => {
    fail('Not implemented');
  });
});
