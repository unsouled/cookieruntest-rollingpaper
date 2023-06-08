import React from 'react';
import './index.css';

export default function Layout({ children }) {
  return (
    <>
      <div style={{ margin: `0 auto`, maxWidth: 650, height: '100%', padding: `0 1rem` }}>
        {children}
      </div>
    </>
  )
}
