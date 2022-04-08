import { act, render } from '@testing-library/react-native';
import { recipesApi } from 'api';
import Screens from 'constants/Screens';
import { ingredient, recipe } from 'mocks';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import IngredientScreen from 'screens/Ingredient';

describe('Ingredient Screen', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn()
    };
    const setRefreshing = jest.fn();
    const setRecipes = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    React.useState = jest
      .fn()
      .mockReturnValueOnce([false, setRefreshing])
      .mockReturnValueOnce([[recipe], setRecipes]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(<IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function recipesApi.fetchRecipesRequest successful', () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockReturnValue([recipe]);

    render(<IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />);

    expect(recipesApi.fetchRecipesRequest).toHaveBeenCalled();
  });

  test('should call function recipesApi.fetchRecipesRequest failed', () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchRecipesRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    render(<IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />);

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });

  test('should call function handleRefreshing successful', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockReturnValue([recipe]);

    const { getByTestId } = render(
      <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
    );
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(recipesApi.fetchRecipesRequest).toHaveBeenCalled();
  });

  test('should call function handleRefreshing failed', async () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchRecipesRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    const { getByTestId } = render(
      <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
    );
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(
      <IngredientScreen navigation={navigation} route={{ params: { ingredient } }} />
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Recipe.name, { item: recipe });
  });
});