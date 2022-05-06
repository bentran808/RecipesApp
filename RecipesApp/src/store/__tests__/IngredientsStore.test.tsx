import { recipesApi } from 'api';
import { ingredient } from 'mocks';
import store from 'store/store';

describe('Ingredients Store', () => {
  test('should call function fetchIngredients successful', async () => {
    recipesApi.fetchIngredientsRequest = jest.fn().mockResolvedValue({ data: [ingredient] });
    await store.ingredients.fetchIngredients();

    expect(store.ingredients.ingredientsJS).toEqual([ingredient]);
  });

  test('should call function fetchIngredients failed', async () => {
    recipesApi.fetchIngredientsRequest = jest.fn().mockRejectedValue('Error');
    await store.ingredients.fetchIngredients();

    expect(store.ingredients.state).toEqual('error');
  });
});
