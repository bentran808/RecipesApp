import { act, fireEvent, render } from '@testing-library/react-native';
import { recipesApi } from 'api';
import { StoreProvider } from 'context';
import { ingredient, recipe } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import IngredientScreen from 'screens/Ingredient';
import store, { RootStore } from 'store/store';

describe('Ingredient Screen', () => {
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
          <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function fetchRecipes successful', () => {
    store.recipes.fetchRecipes = jest.fn().mockReturnValue([recipe]);

    render(
      <StoreProvider value={store}>
        <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
      </StoreProvider>
    );

    expect(store.recipes.fetchRecipes).toHaveBeenCalled();
  });

  test('should call function handleRefreshing successful', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockReturnValue([recipe]);

    const { getByTestId } = render(
      <StoreProvider value={appStore}>
        <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
      </StoreProvider>
    );
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(recipesApi.fetchRecipesRequest).toHaveBeenCalled();
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(
      <StoreProvider value={appStore}>
        <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
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
  //       <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
  //     </StoreProvider>
  //   );

  //   const button = getByTestId('cartBtn');
  //   fireEvent.press(button);

  //   expect(store.cart.addToCart).toHaveBeenCalled();
  // });
});
