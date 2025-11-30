// 팀 생성 응답 DTO (data는 빈 객체) 
export interface TeamCreateResponseDto {
    code: number;
    msg: string;
    data: Record<string, never>; // {}
  }
  