import { fireEvent, render } from '@testing-library/react-native';
import Screens from 'constants/Screens';
import { StoreProvider } from 'context';
import { category, recipe } from 'mocks';
import React from 'react';
import renderer from 'react-test-renderer';
import RecipeScreen from 'screens/Recipe';
import store from 'store/store';

describe('Recipe Screen', () => {
  const newRecipe = { ...recipe, category };
  const setActiveSlide = jest.fn();
  const setQuantity = jest.fn();
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn()
    };
    React.useState = jest
      .fn()
      .mockReturnValueOnce([0, setActiveSlide])
      .mockReturnValueOnce([2, setQuantity]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={store}>
          <RecipeScreen navigation={navigation} route={{ params: { item: newRecipe } }} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressCategory', () => {
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <RecipeScreen navigation={navigation} route={{ params: { item: newRecipe } }} />
      </StoreProvider>
    );
    const button = getByTestId('categoryBtn');

    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.RecipesList.name, { category });
  });

  test('should call function handleViewIngredients', () => {
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <RecipeScreen navigation={navigation} route={{ params: { item: newRecipe } }} />
      </StoreProvider>
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

  test('should call function handleAddToCart', () => {
    store.cart.addToCart = jest.fn().mockImplementation(() => {});
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <RecipeScreen navigation={navigation} route={{ params: { item: newRecipe } }} />
      </StoreProvider>
    );
    const button = getByTestId('addToCartBtn');

    fireEvent.press(button);

    expect(store.cart.addToCart).toHaveBeenCalled();
  });

  test('should call function handleIncrease', () => {
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <RecipeScreen navigation={navigation} route={{ params: { item: newRecipe } }} />
      </StoreProvider>
    );
    const button = getByTestId('increaseBtn');

    fireEvent.press(button);
    expect(setQuantity).toHaveBeenCalled();
  });

  test('should call function handleDecrease', () => {
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <RecipeScreen navigation={navigation} route={{ params: { item: newRecipe } }} />
      </StoreProvider>
    );
    const button = getByTestId('decreaseBtn');

    fireEvent.press(button);
    expect(setQuantity).toHaveBeenCalled();
  });
});
