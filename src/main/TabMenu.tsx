import React from 'react';

export interface TabInfo {
  path: string;
  title: string;
}

interface Props {
  tabData: TabInfo[];
  selected: string;
  linkRender: (tabDatum: TabInfo, onSelected: Function) => JSX.Element;
  onSelected?: Function;
}

export function TabMenu(props: Props) {
  const { tabData, linkRender, selected, onSelected } = props;

  return (
    <div style={styles.tabMenu}>
      {tabData.map((tabDatum, i) => {
        return (
          <span
            key={`tab_datum_${i}`}
            style={selected === tabDatum.path ? styles.activeTab : styles.tab}
          >
            {linkRender(tabDatum, onSelected ? onSelected : () => {})}
          </span>
        );
      })}
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
