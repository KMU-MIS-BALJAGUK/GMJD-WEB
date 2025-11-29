import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  login: (token) => {
    sessionStorage.setItem('accessToken', token);
    set({ accessToken: token });
  },

  logout: () => {
    sessionStorage.removeItem('accessToken');
    set({ accessToken: null });
  },
}));
