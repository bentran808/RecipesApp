import { render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import HomeScreen from 'screens/Home';
import store, { RootStore } from 'store/store';

describe('Home Screen', () => {
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
          <HomeScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function fetchRecipes successful', () => {
    store.recipes.fetchRecipes = jest.fn().mockReturnValue([recipe]);

    render(
      <StoreProvider value={store}>
        <HomeScreen navigation={navigation} />
      </StoreProvider>
    );

    expect(store.recipes.fetchRecipes).toHaveBeenCalled();
  });

  test('should call function handleRefreshing successful', () => {
    store.recipes.fetchRecipes = jest.fn().mockReturnValue([recipe]);

    const { getByTestId } = render(
      <StoreProvider value={store}>
        <HomeScreen navigation={navigation} />
      </StoreProvider>
    );
    const list = getByTestId('recipesList');

    list.props.onRefresh();

    expect(store.recipes.fetchRecipes).toHaveBeenCalled();
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(
      <StoreProvider value={appStore}>
        <HomeScreen navigation={navigation} />
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
  //       <HomeScreen navigation={navigation} />
  //     </StoreProvider>
  //   );

  //   const button = getByTestId('cartBtn');
  //   fireEvent.press(button);

  //   expect(store.cart.addToCart).toHaveBeenCalled();
  // });

  test('should call function getRecipes successful', async () => {
    store.recipes.fetchRecipes = jest.fn().mockReturnValue({ data: [recipe] });

    const { getByTestId } = render(
      <StoreProvider value={store}>
        <HomeScreen navigation={navigation} />
      </StoreProvider>
    );
    const list = getByTestId('recipesList');

    list.props.onEndReached();

    expect(store.recipes.fetchRecipes).toHaveBeenCalled();
  });
});
