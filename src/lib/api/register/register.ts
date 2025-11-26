import api from '@/lib/axios';
import { UserProfileDto, UserSignUpResponseDto } from '@/features/register/types/register';
import axios from 'axios';

const ACCESS_TOKEN_KEY = 'accessToken';

export const signUpUser = async (data: UserProfileDto): Promise<UserSignUpResponseDto> => {
  // 1. 클라이언트 측 토큰 존재 여부 확인
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null;

  if (!accessToken) {
    throw new Error('Access Token not found in Session Storage. Login state required.');
  }

  try {
    // 2. api 인스턴스를 사용하여 요청 전송
    const response = await api.post<UserSignUpResponseDto>('/api/v1/users', data);
    return response.data;
  } catch (error) {
    // 3. 에러 처리
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || 'API Request failed');
    }
    throw error;
  }
};
