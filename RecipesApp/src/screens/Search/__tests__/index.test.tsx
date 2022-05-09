import { render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import store, { RootStore } from 'store/store';
import SearchScreen from '..';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn().mockReturnValue(true)
}));

describe('Categories Screen', () => {
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
    const tree = renderer.create(
      <StoreProvider value={appStore}>
        <SearchScreen navigation={navigation} />
      </StoreProvider>
    );
    expect(tree.toJSON()).toMatchSnapshot();

    const button = tree.root.findAllByType(TouchableOpacity)[0];
    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('should call function setEmptyRecipes successful', () => {
    store.recipes.setEmptyRecipes = jest.fn();

    render(
      <StoreProvider value={store}>
        <SearchScreen navigation={navigation} />
      </StoreProvider>
    );

    expect(store.recipes.setEmptyRecipes).toHaveBeenCalled();
  });
});
