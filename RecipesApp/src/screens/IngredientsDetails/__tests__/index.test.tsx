import { render } from '@testing-library/react-native';
import Screens from 'constants/Screens';
import { StoreProvider } from 'context';
import { ingredient } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import IngredientsDetailsScreen from 'screens/IngredientsDetails';
import store, { RootStore } from 'store/store';

describe('Ingredients Details Screen', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {},
    ingredients: {
      lists: [ingredient]
    },
    cart: {},
    address: {}
  });
  let navigation: any;
  const params = { title: 'Test', ingredients: [[0, '200ml']] };

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
          <IngredientsDetailsScreen navigation={navigation} route={{ params }} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function fetchIngredients successful', () => {
    store.ingredients.fetchIngredients = jest.fn().mockReturnValue([ingredient]);

    render(
      <StoreProvider value={store}>
        <IngredientsDetailsScreen navigation={navigation} route={{ params }} />
      </StoreProvider>
    );

    expect(store.ingredients.fetchIngredients).toHaveBeenCalled();
  });

  test('should call function handlePressIngredient', () => {
    const component = renderer.create(
      <StoreProvider value={appStore}>
        <IngredientsDetailsScreen navigation={navigation} route={{ params }} />
      </StoreProvider>
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Ingredient.name, { ingredient });
  });
});
