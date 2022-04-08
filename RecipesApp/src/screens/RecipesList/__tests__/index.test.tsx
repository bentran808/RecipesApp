import { act, render } from '@testing-library/react-native';
import { recipesApi } from 'api';
import Screens from 'constants/Screens';
import { category, recipe } from 'mocks';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import RecipesListScreen from 'screens/RecipesList';

describe('Recipes List Screen', () => {
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
      .create(<RecipesListScreen navigation={navigation} route={{ params: { category } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function recipesApi.fetchRecipesByCategoryIdRequest successful', () => {
    recipesApi.fetchRecipesByCategoryIdRequest = jest.fn().mockReturnValue([recipe]);

    render(<RecipesListScreen navigation={navigation} route={{ params: { category } }} />);

    expect(recipesApi.fetchRecipesByCategoryIdRequest).toHaveBeenCalled();
  });

  test('should call function recipesApi.fetchRecipesByCategoryIdRequest failed', () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchRecipesByCategoryIdRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    render(<RecipesListScreen navigation={navigation} route={{ params: { category } }} />);

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });

  test('should call function handleRefreshing successful', async () => {
    recipesApi.fetchRecipesByCategoryIdRequest = jest.fn().mockReturnValue([recipe]);

    const { getByTestId } = render(
      <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
    );
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(recipesApi.fetchRecipesByCategoryIdRequest).toHaveBeenCalled();
  });

  test('should call function handleRefreshing failed', async () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchRecipesByCategoryIdRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    const { getByTestId } = render(
      <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
    );
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(
      <RecipesListScreen navigation={navigation} route={{ params: { category } }} />
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Recipe.name, { item: recipe });
  });
});
