'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import styles from './login.module.css';


export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const success = login(email, password);
    if (!success) {
      setError('Credenciales inválidas');
      return;
    }
    router.push('/');
  };

  return (
  <div className={styles.container}>
    <div className={styles.loginCard}>
      <h1 className={styles.title}>Iniciar sesión</h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          placeholder="test@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Password</label>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.loginButton} onClick={handleSubmit}>
        Ingresar
      </button>

      <div className={styles.divider}>
        <span className={styles.dividerText}>o</span>
      </div>

      <button
        className={styles.registerLink}
        onClick={() => router.push('/register')}
      >
        Crear cuenta
      </button>

   
    </div>
  </div>
);

}
