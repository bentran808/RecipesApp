import { recipesApi } from 'api';
import { category } from 'mocks';
import store from 'store/store';

describe('Categories Store', () => {
  test('should call function fetchCategories successful', async () => {
    recipesApi.fetchCategoriesRequest = jest.fn().mockResolvedValue({ data: [category] });
    await store.categories.fetchCategories();

    expect(store.categories.categoriesJS).toEqual([category]);
  });

  test('should call function fetchCategories failed', async () => {
    recipesApi.fetchCategoriesRequest = jest.fn().mockRejectedValue('Error');
    await store.categories.fetchCategories();

    expect(store.categories.state).toEqual('error');
  });
});
