import { category } from 'mocks';
import renderer from 'react-test-renderer';
import RecipesListScreen from 'screens/RecipesList';

describe('Recipes List Screen', () => {
  let navigation: any;

  test('should render correctly', () => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn()
    };
    const tree = renderer
      .create(<RecipesListScreen navigation={navigation} route={{ params: { category } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
