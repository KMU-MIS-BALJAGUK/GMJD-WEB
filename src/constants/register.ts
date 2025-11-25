import { CATEGORY_MAP } from './contest';

export const EDUCATION_MAP: Record<string, 'HIGH_SCHOOL' | 'UNIVERSITY'> = {
  고등학교: 'HIGH_SCHOOL',
  대학교: 'UNIVERSITY',
};

export const DEGREE_MAP: Record<string, 'ASSOCIATE' | 'BACHELOR'> = {
  '대학교 (2, 3년제)': 'ASSOCIATE',

  '대학교 (4년제)': 'BACHELOR',
};

// CATEGORY_MAP은 contest.ts에서 import하여 사용
export { CATEGORY_MAP };
