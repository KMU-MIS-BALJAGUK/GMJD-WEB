// AI 질문 추천 DTO
//  - POST /api/v1/teams/{contestId}/ai-question

// AI 질문 추천 응답 DTO 
export interface AiQuestionRecommendResponseDto {
    code: number;
    msg: string;
    data: {
      aiRecommendQuestionList: string[];
    };
  }
  