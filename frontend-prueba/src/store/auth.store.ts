import { create } from 'zustand';

interface User {
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null,

  login: (email, password) => {
    if (!email || !password) return false;

    const username = email.split('@')[0];
    const user = { email, username };

    localStorage.setItem('user', JSON.stringify(user));
    set({ user });

    return true;
  },

  register: (email, password) => {
  if (!email || !password) return false;
 
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  users.push({ email, password });

  localStorage.setItem('users', JSON.stringify(users));
  return true;
},


  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));
