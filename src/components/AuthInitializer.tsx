'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthInitializer() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) login(token);
  }, [login]);

  return null;
}
