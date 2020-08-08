import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {}

export function TabMenu(props: Props) {
  const location = useLocation();

  return (
    <div style={styles.tabMenu}>
      <span
        style={location.pathname === '/import' ? styles.activeTab : styles.tab}
      >
        <Link to="/import">Import</Link>
      </span>
      <span
        style={location.pathname === '/export' ? styles.activeTab : styles.tab}
      >
        <Link to="/export">Export</Link>
      </span>
    </div>
  );
}

const styles = {
  tabMenu: {
    padding: 8,
    backgroundColor: 'lightgrey',
  },
  tab: {
    padding: 8,
    backgroundColor: 'darkgrey',
  },
  activeTab: {
    padding: 8,
    backgroundColor: 'grey',
  },
};
