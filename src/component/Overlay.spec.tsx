import React from 'react';
import 'jest';
import { render } from '@testing-library/react';
import { Overlay } from './Overlay';

describe('Overlay', () => {
  it('renders without crash', () => {
    render(<Overlay />);
  });
  it('can render an inner component without crash', () => {
    // let innerComponent = <div>Something</div>;
    // render(<Overlay>{innerComponent}</Overlay>);
    fail('Not implemented');
  });
  it('can render context menu items', () => {
    // let menuItems = [<div>Something</div>];
    // render(<Overlay contextMenuItems={menuItems}></Overlay>);
    fail('Not implemented');
  });
});
