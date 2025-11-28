// src/types/api.ts
// 범용 API 응답 인터페이스

export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}
