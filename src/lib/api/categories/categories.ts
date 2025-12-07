import api from '@/lib/axios';

export interface CategoryItem {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  code: number;
  msg: string;
  data: {
    categories: CategoryItem[];
  };
}

export async function getCategories(): Promise<CategoryItem[]> {
  const response = await api.get<CategoriesResponse>('/api/v1/categories');
  return response.data.data.categories;
}
