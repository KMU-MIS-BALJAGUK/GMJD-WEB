'use client';

import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 쿠키 포함 요청 허용
  timeout: 5000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken =
      typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API ERROR:', error);

    const status = error.response?.status;

    // 401 처리 — 토큰 만료 같은 경우
    if (status === 401) {
      console.warn('401 Unauthorized - 로그인 필요함');
    }

    return Promise.reject(error);
  }
);

export default api;
