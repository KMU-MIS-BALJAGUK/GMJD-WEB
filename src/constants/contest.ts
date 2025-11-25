import { ContestFilterParams } from '@/types/contest';

// 정렬 매핑
export const SORT_MAP: Record<string, ContestFilterParams['sort']> = {
  전체: 'latest',
  인기순: 'popular',
  마감임박순: 'deadline',
};

// 카테고리 매핑 (name → id)
export const CATEGORY_MAP: Record<string, number> = {
  '기획/아이디어': 1,
  '광고/마케팅': 2,
  '사진/영상/UCC': 3,
  '디자인/순수미술/공예': 4,
  '네이밍/슬로건': 5,
  '캐릭터/만화/게임': 6,
  '건축/건설/인테리어': 7,
  '과학/공학': 8,
  '예체능/패션': 9,
  '전시/페스티벌': 10,
  '문학/시나리오': 11,
  해외: 12,
  학술: 13,
  창업: 14,
  기타: 15,
};
