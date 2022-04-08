import { ingredientsDetails } from 'mocks';
import renderer from 'react-test-renderer';
import IngredientItem from '..';

describe('Ingredient Item Component', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(<IngredientItem item={ingredientsDetails} onPressIngredient={jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
