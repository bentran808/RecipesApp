import RecipeCard from 'components/RecipeCard';
import { recipe } from 'mocks';
import renderer from 'react-test-renderer';

describe('Recipe Card Component', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<RecipeCard item={recipe} onPressRecipe={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
