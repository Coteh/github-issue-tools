import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { TabMenu } from './TabMenu';

describe('TabMenu', () => {
  it('renders without crash', () => {
    render(
      <TabMenu tabData={[]} selected="" linkRender={(_) => <span></span>} />,
    );
  });
  it('can switch to another tab when clicked', () => {
    const stub = jest.fn();
    const { getByText } = render(
      <TabMenu
        tabData={[
          {
            path: '/',
            title: 'Home',
          },
          {
            path: '/page',
            title: 'Page',
          },
        ]}
        selected="/"
        linkRender={(info, onSelected) => (
          <span onClick={(e) => onSelected(e)}>{info.title}</span>
        )}
        onSelected={stub}
      />,
    );

    expect(stub).not.toHaveBeenCalled();

    fireEvent.click(getByText('Page'));

    expect(stub).toHaveBeenCalledTimes(1);
  });
});
