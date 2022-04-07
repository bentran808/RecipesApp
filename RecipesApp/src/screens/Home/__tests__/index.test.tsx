import { recipesApi } from 'api';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from 'screens/Home';
import { act, render } from '@testing-library/react-native';
import { recipe } from 'mocks';
import { Alert } from 'react-native';

describe('Home Screen', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
      openDrawer: jest.fn()
    };
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockReturnValue([recipe]);

    const tree = renderer.create(<HomeScreen navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function recipesApi.fetchRecipesRequest successful', () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockReturnValue([recipe]);

    render(<HomeScreen navigation={navigation} />);

    expect(recipesApi.fetchRecipesRequest).toHaveBeenCalled();
  });

  test('should call function recipesApi.fetchRecipesRequest failed', () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchRecipesRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    render(<HomeScreen navigation={navigation} />);

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });

  test('should call function handleRefreshing successful', async () => {
    recipesApi.fetchRecipesRequest = jest.fn().mockReturnValue([recipe]);

    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
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

    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
    const list = getByTestId('recipesList');

    await act(async () => {
      list.props.onRefresh();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });
});
