import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export function TabMenu(props: Props) {
  return (
    <div>
      <Link
        style={{
          padding: 8,
        }}
        to="/import"
      >
        Import
      </Link>
      <Link
        style={{
          padding: 8,
        }}
        to="/export"
      >
        Export
      </Link>
    </div>
  );
}
