'use client';

import { useAuthStore } from '@/store/auth.store';

export function Header() {
  const user = useAuthStore((s) => s.user);

  return (
    <header
      style={{
        height: '56px',
        backgroundColor: '#3a3a3a',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}
    >
      {/* LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/spybee.png" alt="Spybee" style={{ height: '28px' }} />
        <strong>Spybee</strong>
      </div>

      {/* USER */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f5c400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>

          <span>{user.username}</span>
        </div>
      )}
    </header>
  );
}
