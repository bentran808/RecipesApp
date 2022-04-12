import { render } from '@testing-library/react-native';
import { recipesApi } from 'api';
import Screens from 'constants/Screens';
import { category } from 'mocks';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import CategoriesScreen from '..';

describe('Categories Screen', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
      openDrawer: jest.fn()
    };
    const setCategories = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    React.useState = jest.fn().mockReturnValue([[category], setCategories]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer.create(<CategoriesScreen navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressCategory', () => {
    const component = renderer.create(<CategoriesScreen navigation={navigation} />);
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.RecipesList.name, { category });
  });

  test('should call function recipesApi.fetchCategoriesRequest successful', () => {
    recipesApi.fetchCategoriesRequest = jest.fn().mockReturnValue([category]);

    render(<CategoriesScreen navigation={navigation} />);

    expect(recipesApi.fetchCategoriesRequest).toHaveBeenCalled();
  });

  test('should call function recipesApi.fetchCategoriesRequest failed', () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchCategoriesRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    render(<CategoriesScreen navigation={navigation} />);

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });
});
