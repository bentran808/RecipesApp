import { render } from '@testing-library/react-native';
import Screens from 'constants/Screens';
import { StoreProvider } from 'context';
import { category } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import store, { RootStore } from 'store/store';
import CategoriesScreen from '..';

describe('Categories Screen', () => {
  const appStore = RootStore.create({
    categories: {
      lists: [category]
    },
    recipes: {},
    ingredients: {},
    cart: {},
    address: {}
  });
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <CategoriesScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressCategory', () => {
    const component = renderer.create(
      <StoreProvider value={appStore}>
        <CategoriesScreen navigation={navigation} />
      </StoreProvider>
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.RecipesList.name, { category });
  });

  test('should call function fetchCategories successful', () => {
    store.categories.fetchCategories = jest.fn().mockReturnValue([category]);

    render(
      <StoreProvider value={store}>
        <CategoriesScreen navigation={navigation} />
      </StoreProvider>
    );

    expect(store.categories.fetchCategories).toHaveBeenCalled();
  });
});
