import { axiosInstance } from 'api/axiosConfig';
import { recipesApi } from 'api/recipesApi';
import { category, ingredient, recipe } from 'mocks';

jest.mock('api/axiosConfig');

describe('Test recipes api', () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call function fetchCategoriesRequest', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [category] });
    await recipesApi.fetchCategoriesRequest();
    expect(mockedAxios.get).toHaveBeenCalledWith('categories?_embed=recipes');
  });

  test('should call function fetchIngredientsRequest', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [ingredient] });
    await recipesApi.fetchIngredientsRequest();
    expect(mockedAxios.get).toHaveBeenCalledWith('ingredients');
  });

  test('should call function fetchRecipesRequest', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [recipe] });
    await recipesApi.fetchRecipesRequest();
    expect(mockedAxios.get).toHaveBeenCalledWith('recipes?_expand=category&_page=1&_limit=6');
  });

  test('should call function fetchRecipesByCategoryIdRequest', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [recipe] });
    await recipesApi.fetchRecipesByCategoryIdRequest(0);
    expect(mockedAxios.get).toHaveBeenCalledWith('recipes?_expand=category&categoryId=0');
  });

  test('should call function searchByCategoryNameRequest', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [recipe] });
    await recipesApi.searchByCategoryNameRequest('c');
    expect(mockedAxios.get).toHaveBeenCalledWith('categories?name_like=c&_embed=recipes');
  });

  test('should call function searchByRecipeNameRequest', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [recipe] });
    await recipesApi.searchByRecipeNameRequest('c');
    expect(mockedAxios.get).toHaveBeenCalledWith('recipes?_expand=category&title_like=c');
  });
});
