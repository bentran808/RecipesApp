import { ingredient, ingredientsDetails, recipe } from 'mocks';
import { getRecipesByIngredient, mappingIngredientsDetails } from 'utils/helpers';

describe('Test helpers', () => {
  test('should call function mappingIngredientsDetails', () => {
    const actual = mappingIngredientsDetails([[0, '200ml']], [ingredient]);
    expect(actual).toEqual([ingredientsDetails]);
  });

  test('should call function getRecipesByIngredient', () => {
    const actual = getRecipesByIngredient([recipe], 0);
    expect(actual).toEqual([recipe]);
  });
});
