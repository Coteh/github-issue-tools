import React from 'react';
import { render } from '@testing-library/react';
import { ImportMapDialog } from './ImportMapDialog';

describe('ImportMapDialog', () => {
  it('render without crash', () => {
    render(
      <ImportMapDialog
        userColumns={[]}
        importFields={[]}
        handleImportMap={() => {}}
      />,
    );
  });
  it('displays mappable columns in dropdown', () => {
    fail('Not implemented');
  });
  it('displays GitHub Issue fields as a list', () => {
    fail('Not implemented');
  });
  it('invokes import map callback when field is mapped', () => {
    fail('Not implemented');
  });
});
