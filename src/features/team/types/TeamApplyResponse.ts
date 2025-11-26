// 팀 신청 응답 DTO (data는 빈 객체) 
export interface TeamApplyResponseDto {
  code: number;
  msg: string;
  data: Record<string, never>; 
}
