import api from '@/lib/axios';
import { UserProfileDto, UserSignUpResponseDto } from '@/features/register/types/register';
import axios from 'axios';

export const signUpUser = async (data: UserProfileDto): Promise<UserSignUpResponseDto> => {
  try {
    // api 인스턴스를 사용하여 요청 전송
    const response = await api.post<UserSignUpResponseDto>('/api/v1/users', data);
    return response.data;
  } catch (error) {
    // 에러 처리
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || 'API Request failed');
    }
    throw error;
  }
};
