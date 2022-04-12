import { fireEvent, render } from '@testing-library/react-native';
import Screens from 'constants/Screens';
import { category, recipe } from 'mocks';
import renderer from 'react-test-renderer';
import RecipeScreen from 'screens/Recipe';

describe('Recipe Screen', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
      goBack: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(<RecipeScreen navigation={navigation} route={{ params: { item: recipe } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressCategory', () => {
    const { getByTestId } = render(
      <RecipeScreen navigation={navigation} route={{ params: { item: recipe } }} />
    );
    const button = getByTestId('categoryBtn');

    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.RecipesList.name, { category });
  });

  test('should call function handleViewIngredients', () => {
    const { getByTestId } = render(
      <RecipeScreen navigation={navigation} route={{ params: { item: recipe } }} />
    );
    const button = getByTestId('viewIngredientsBtn');

    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.IngredientsDetails.name, {
      ingredients: [
        [0, '200ml'],
        [1, '5g'],
        [2, '300g']
      ],
      title: 'Ingredients for Oatmeal Cookies'
    });
  });
});
