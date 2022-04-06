import { axiosInstance } from './axiosConfig';

export const recipesApi = {
  fetchCategoriesRequest() {
    return axiosInstance.get('categories?_embed=recipes');
  },
  fetchIngredientsRequest() {
    return axiosInstance.get('ingredients');
  },
  fetchRecipesRequest() {
    return axiosInstance.get('recipes?_expand=category');
  },
  searchByCategoryNameRequest(keyword: string) {
    return axiosInstance.get(`categories?name_like=${keyword}&_embed=recipes`);
  },
  searchByRecipeNameRequest(keyword: string) {
    return axiosInstance.get(`recipes?title_like=${keyword}`);
  }
};
