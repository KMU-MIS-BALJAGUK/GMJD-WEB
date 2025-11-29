import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 50000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // Zustand에서 직접 가져오기

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn('401 Unauthorized → 자동 로그아웃 처리');
      useAuthStore.getState().logout(); // Zustand logout 호출
    }

    return Promise.reject(error);
  }
);

export default api;
