import { fireEvent, render } from '@testing-library/react-native';
import RecipeCard from 'components/RecipeCard';
import { recipe } from 'mocks';
import renderer from 'react-test-renderer';

describe('Recipe Card Component', () => {
  const onPressCart = jest.fn();

  test('should render correctly', () => {
    const tree = renderer
      .create(<RecipeCard item={recipe} onPressRecipe={jest.fn()} onPressCart={onPressCart} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function onPressCart', () => {
    const { getByTestId } = render(
      <RecipeCard item={recipe} onPressRecipe={jest.fn()} onPressCart={onPressCart} />
    );

    const button = getByTestId('cartBtn');
    fireEvent.press(button);

    expect(onPressCart).toHaveBeenCalled();
  });
});
