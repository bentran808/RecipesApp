import { recipesApi } from 'api';
import { category, recipe } from 'mocks';
import store from 'store/store';

describe('Recipes Store', () => {
  test('should call function fetchRecipes successful', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockResolvedValue({ data: [recipe] });
    await store.recipes.fetchRecipes(1);

    expect(store.recipes.recipesJS).toEqual([recipe]);
  });

  test('should call function fetchRecipes successful page 2', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockResolvedValue({ data: [recipe] });
    await store.recipes.fetchRecipes(2);

    expect(store.recipes.recipesJS).toEqual([recipe, recipe]);
  });

  test('should call function fetchRecipes failed', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockRejectedValue('Error');
    await store.recipes.fetchRecipes(1);

    expect(store.recipes.state).toEqual('error');
  });

  test('should call function fetchRecipes successful page 3', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockResolvedValue({ data: [] });
    await store.recipes.fetchRecipes(2);

    expect(store.recipes.isEndList).toBeTruthy();
  });

  test('should call function fetchRecipesByCategoryId successful', async () => {
    recipesApi.fetchRecipesByCategoryIdRequest = jest.fn().mockResolvedValue({ data: [recipe] });
    await store.recipes.fetchRecipesByCategoryId(0);

    expect(store.recipes.recipesJS).toEqual([recipe]);
  });

  test('should call function fetchRecipesByCategoryId failed', async () => {
    recipesApi.fetchRecipesByCategoryIdRequest = jest.fn().mockRejectedValue('Error');
    await store.recipes.fetchRecipesByCategoryId(0);

    expect(store.recipes.state).toEqual('error');
  });

  test('should call function searchRecipeName successful', async () => {
    recipesApi.searchByRecipeNameRequest = jest.fn().mockResolvedValue({ data: [recipe] });
    await store.recipes.searchRecipeName('c');

    expect(store.recipes.recipesJS).toEqual([recipe, recipe]);
  });

  test('should call function searchRecipeName failed', async () => {
    recipesApi.searchByRecipeNameRequest = jest.fn().mockRejectedValue('Error');
    await store.recipes.searchRecipeName('c');

    expect(store.recipes.state).toEqual('error');
  });

  test('should call function searchCategoryName successful', async () => {
    recipesApi.searchByCategoryNameRequest = jest
      .fn()
      .mockResolvedValue({ data: [{ ...category, recipes: [recipe] }] });
    await store.recipes.searchCategoryName('c');

    expect(store.recipes.recipesJS).toEqual([recipe, recipe, recipe]);
  });

  test('should call function searchCategoryName failed', async () => {
    recipesApi.searchByCategoryNameRequest = jest.fn().mockRejectedValue('Error');
    await store.recipes.searchCategoryName('c');

    expect(store.recipes.state).toEqual('error');
  });

  test('should call function setKeyword', () => {
    store.recipes.setKeyword('test');
    expect(store.recipes.keyword).toEqual('test');
  });

  test('should call function setEmptyRecipes', () => {
    store.recipes.setEmptyRecipes();
    expect(store.recipes.recipesJS).toEqual([]);
  });
});
