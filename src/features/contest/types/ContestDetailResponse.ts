// src/features/contest/types/ContestDetailResponse.ts


// 공모전 상세 API DTO
//  - GET /api/v1/contests/{contestId}

//  공모전 상세 페이지 DTO (상세 페이지 상단 정보) 
export interface ContestDetailDto {
    name: string;               // 공모전 이름
    organizationName: string;   // 주최 기관명
    companyType: string;        // 기업 형태 (예: 대기업, 공공기관 등)
    benefits: string;           // 활동 혜택 / 비고
    awardScale: string;         // 시상 규모 (예: "400만 원")
    duration: string;           // 진행 기간 (예: "2025-10-02 ~ 2025-12-19")
    targetParticipants: string; // 참가 대상 (예: "대상 제한 없음")
    siteUrl: string;            // 공식 사이트 URL
    additionalBenefits: string; // 추가 혜택
    categories: string;         // 카테고리 문자열 (예: "사진/영상/UCC")
    imageUrl: string;           // 포스터 이미지 URL
  }
  
  // 공모전 상세 응답 DTO 
  export interface ContestDetailResponseDto {
    code: number;
    msg: string;
    data: ContestDetailDto;
  }
  