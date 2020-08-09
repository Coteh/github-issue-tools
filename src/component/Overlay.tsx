import React from 'react';

interface Props {}

export function Overlay(props: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '16px',
        border: '1px solid black',
        width: '40%',
        minHeight: '40%',
        zIndex: 1000,
      }}
    >
      Test overlay
    </div>
  );
}
