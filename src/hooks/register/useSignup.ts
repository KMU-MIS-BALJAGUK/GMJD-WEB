import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { signUpUser } from '@/lib/api/register/register';
import { UserProfileDto, UserSignUpResponseDto } from '@/types/register';

export const useSignUp = (
  options?: Omit<UseMutationOptions<UserSignUpResponseDto, Error, UserProfileDto>, 'mutationFn'>
) => {
  return useMutation<UserSignUpResponseDto, Error, UserProfileDto>({
    mutationFn: signUpUser,

    mutationKey: ['signUpUser'],

    ...options,
  });
};
