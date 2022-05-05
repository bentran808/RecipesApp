import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { RootStore } from 'store/store';
import SearchScreen from '..';

describe('Categories Screen', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {
      resultsOfSearch: [recipe]
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
          <SearchScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(
      <StoreProvider value={appStore}>
        <SearchScreen navigation={navigation} />
      </StoreProvider>
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
