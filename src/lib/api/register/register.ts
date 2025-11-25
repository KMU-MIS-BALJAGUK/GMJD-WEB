import api from '@/lib/axios';
import { UserProfileDto, UserSignUpResponseDto } from '@/types/register';

// 자체 회원가입 API
export async function signUpUser(data: UserProfileDto) {
  const response = await api.post<UserSignUpResponseDto>(`/api/v1/users`, data);

  return response.data;
}
