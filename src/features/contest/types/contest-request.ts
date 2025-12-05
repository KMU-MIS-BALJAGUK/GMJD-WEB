export interface ContestsParams {
  // 공모전 리스트 파라미터 DTO
  sortType: 'latest' | 'popular' | 'deadline';
  categoryIdList?: number[];
  page?: number;
  size?: number;
}

export interface ContestSearchKeywordDto {
  // 공모전 검색 바디 DTO
  keyword: string | null;
}
