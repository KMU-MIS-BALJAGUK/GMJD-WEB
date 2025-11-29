export interface ContestItemDto {
  // 공모전 리스트 아이템 DTO
  id: number;
  imageUrl: string;
  remainingDays: number;
  openTeamCount: number;
  name: string;
  organizationName: string;
}

export interface ContestListDataDto {
  // 공모전 리스트 데이터 DTO
  contests: ContestItemDto[];
}

export interface ContestListResponseDto {
  // 공모전 리스트 응답 DTO
  code: number;
  msg: string;
  data: ContestListDataDto;
  currentPage: number;
  totalPages: number;
  totalElements: number;
}
