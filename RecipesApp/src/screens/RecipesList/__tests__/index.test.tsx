import { act, render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { category, recipe } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import RecipesListScreen from 'screens/RecipesList';
import store, { RootStore } from 'store/store';

describe('Recipes List Screen', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {
      items: [recipe]
    },
    ingredients: {},
    cart: {},
    address: {}
  });
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function fetchRecipesByCategoryId successful', () => {
    store.recipes.fetchRecipesByCategoryId = jest.fn().mockReturnValue([recipe]);

    render(
      <StoreProvider value={store}>
        <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
      </StoreProvider>
    );

    expect(store.recipes.fetchRecipesByCategoryId).toHaveBeenCalled();
  });

  test('should call function handleRefreshing successful', async () => {
    store.recipes.fetchRecipesByCategoryId = jest.fn().mockReturnValue([recipe]);

    const { getByTestId } = render(
      <StoreProvider value={store}>
        <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
      </StoreProvider>
    );
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(store.recipes.fetchRecipesByCategoryId).toHaveBeenCalled();
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(
      <StoreProvider value={appStore}>
        <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
      </StoreProvider>
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalled();
  });

  // test('should call function handleAddToCart', () => {
  //   store.cart.addToCart = jest.fn().mockImplementation(() => {});
  //   const { getByTestId } = render(
  //     <StoreProvider value={appStore}>
  //       <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
  //     </StoreProvider>
  //   );
  //   const button = getByTestId('cartBtn');

  //   fireEvent.press(button);

  //   expect(store.cart.addToCart).toHaveBeenCalled();
  // });
});
