import { LoginRequestDTO } from '@/features/auth/auth-request';
import { LoginResponseDTO, LogoutResponseDTO } from '@/features/auth/auth-response';
import api from '@/lib/axios';
import { ApiResponse } from '@/types/api';

// 로그인 요청
export const loginAPI = async (payload: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const res = await api.post<ApiResponse<LoginResponseDTO>>('/auth/login', payload);
  return res.data.data;
};

// 로그아웃 요청
export const logoutAPI = async (): Promise<LogoutResponseDTO> => {
  const res = await api.post<ApiResponse<LogoutResponseDTO>>('/logout', {});
  return res.data.data;
};
