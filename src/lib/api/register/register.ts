import axios from 'axios';
import { UserProfileDto, UserSignUpResponseDto } from '@/types/register';

const ACCESS_TOKEN_KEY = 'access_token';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev.gmjd.site';

export const signUpUser = async (data: UserProfileDto): Promise<UserSignUpResponseDto> => {
  // URL이 설정되지 않았다면 명시적으로 에러를 발생시킵니다.
  if (!API_BASE_URL) {
    throw new Error(
      'API Base URL is not configured. Check NEXT_PUBLIC_API_BASE_URL in .env files.'
    );
  }

  // 2. Session Storage에서 액세스 토큰을 가져옵니다.
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null;

  if (!accessToken) {
    //  토큰 부재 시 에러 발생
    throw new Error('Access Token not found in Session Storage. Login state required.');
  }

  try {
    const fullUrl = `${API_BASE_URL}/api/v1/users`;

    const response = await axios.post<UserSignUpResponseDto>(
      fullUrl,
      data, // Request Body (UserProfileDto)
      {
        // 4.  Authorization 헤더에 토큰을 추가합니다.
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || 'API Request failed');
    }
    throw error;
  }
};
