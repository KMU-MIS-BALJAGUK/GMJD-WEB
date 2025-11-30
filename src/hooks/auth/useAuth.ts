import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { LoginRequestDTO } from '@/features/auth/auth-request';
import { loginAPI, logoutAPI } from '@/lib/api/auth/auth';

// 로그인 훅
export const useLogin = () => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: LoginRequestDTO) => loginAPI(data),
    onSuccess: (data) => {
      login(data.accessToken); // Zustand에 accessToken 저장
    },
  });
};

// 로그아웃 훅
export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      logout(); // Zustand에서 토큰 제거
    },
  });
};
