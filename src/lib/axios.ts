import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_API_URL = '/api/v1/auth/refresh'; //나중에 백엔드에서 추가해주는 API 참고해서 수정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// 동시 요청 갱신 방지 및 요청 큐 관리
let isRefreshing = false;
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  config: CustomAxiosRequestConfig;
}[] = [];

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 쿠키 포함 요청 허용
  timeout: 5000,
});

// 큐에 쌓인 요청을 처리하는 헬퍼 함수
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      // 새 토큰으로 요청 재시도 (api 인스턴스를 통해 재호출)
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken =
      typeof window !== 'undefined' ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null;

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
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    const status = error.response?.status;

    // 401 처리 — 토큰 만료 같은 경우
    if (status === 401 && originalRequest && !originalRequest._retry) {
      // 2. 동시 요청 방지를 위한 큐 처리
      if (isRefreshing) {
        // 갱신 중이라면 현재 요청을 큐에 넣고 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      console.warn('401 Unauthorized. Access Token 갱신 시도...');

      try {
        // 3. Refresh API 호출: RT는 쿠키에 담겨 자동 전송됩니다.
        const refreshResponse = await axios.post(`${API_BASE_URL}${REFRESH_API_URL}`, null, {
          withCredentials: true,
        });

        const newFullToken: string | undefined = refreshResponse.headers['authorization'];
        const newAccessToken: string | null = newFullToken?.startsWith('Bearer ')
          ? newFullToken.substring(7)
          : refreshResponse.data?.accessToken || null; // 헤더 또는 바디에서 AT 추출

        if (!newAccessToken) {
          throw new Error('서버에서 새로운 Access Token을 받지 못했습니다. 재로그인 필요.');
        } // 4. 새 AT를 sessionStorage에 저장

        sessionStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken); // 5. 기본 헤더 및 실패한 요청의 헤더 업데이트

        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        } // 6. 큐 처리 및 원래 요청 재시도

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        // 7. Refresh 실패 (RT 만료/오류) 시 강제 로그아웃
        console.error('Token refresh failed. Logging out.', refreshError);
        processQueue(refreshError as AxiosError);
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        // 로그인 페이지로 리다이렉트 (Next.js 환경을 고려하여 window.location 사용)
        window.location.href = '/signup';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error('API ERROR:', error);
    return Promise.reject(error);
  }
);

export default api;
