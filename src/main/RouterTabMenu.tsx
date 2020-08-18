import React from 'react';
import { TabMenu, TabInfo } from './TabMenu';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  tabData: TabInfo[];
}

export function RouterTabMenu(props: Props) {
  const location = useLocation();

  const { tabData } = props;

  return (
    <TabMenu
      tabData={tabData}
      selected={location.pathname}
      linkRender={(tabDatum, onSelected) => (
        <Link onClick={(e) => onSelected(e)} to={tabDatum.path}>
          {tabDatum.title}
        </Link>
      )}
    />
  );
}
