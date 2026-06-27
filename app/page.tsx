'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    window.location.replace('/index.html');
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f4f7f7',
      color: '#1f2937'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 18,
        padding: 24,
        boxShadow: '0 4px 18px rgba(15,23,42,.08)'
      }}>
        正在開啟旅行頁面...
      </div>
    </main>
  );
}
