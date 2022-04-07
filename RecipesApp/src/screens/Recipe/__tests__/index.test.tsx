import { recipe } from 'mocks';
import renderer from 'react-test-renderer';
import RecipeScreen from 'screens/Recipe';

describe('Recipe Screen', () => {
  let navigation: any;

  test('should render correctly', () => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
      goBack: jest.fn()
    };
    const tree = renderer
      .create(<RecipeScreen navigation={navigation} route={{ params: { item: recipe } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
