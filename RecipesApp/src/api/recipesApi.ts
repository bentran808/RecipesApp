import { axiosInstance } from './axiosConfig';

export const recipesApi = {
  fetchCategoriesRequest() {
    return axiosInstance.get('categories?_embed=recipes');
  },
  fetchIngredientsRequest() {
    return axiosInstance.get('ingredients');
  },
  fetchRecipesRequest(page?: number) {
    return axiosInstance.get(`recipes?_expand=category&_page=${page || 1}&_limit=6`);
  },
  fetchRecipesByCategoryIdRequest(id: number) {
    return axiosInstance.get(`recipes?_expand=category&categoryId=${id}`);
  },
  searchByCategoryNameRequest(keyword: string) {
    return axiosInstance.get(`categories?name_like=${keyword}&_embed=recipes`);
  },
  searchByRecipeNameRequest(keyword: string) {
    return axiosInstance.get(`recipes?_expand=category&title_like=${keyword}`);
  }
};
