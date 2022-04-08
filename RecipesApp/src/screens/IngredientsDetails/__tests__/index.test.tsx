import { render } from '@testing-library/react-native';
import { recipesApi } from 'api';
import Screens from 'constants/Screens';
import { ingredient, ingredientsDetails } from 'mocks';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import IngredientsDetailsScreen from 'screens/IngredientsDetails';

describe('Ingredients Details Screen', () => {
  let navigation: any;
  const params = { title: 'Test', ingredients: [[0, '200ml']] };

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn()
    };
    const setIngredientsDetails = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    React.useState = jest.fn().mockReturnValue([[ingredientsDetails], setIngredientsDetails]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(<IngredientsDetailsScreen navigation={navigation} route={{ params }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function recipesApi.fetchIngredientsRequest successful', () => {
    recipesApi.fetchIngredientsRequest = jest.fn().mockReturnValue([ingredientsDetails]);

    render(<IngredientsDetailsScreen navigation={navigation} route={{ params }} />);

    expect(recipesApi.fetchIngredientsRequest).toHaveBeenCalled();
  });

  test('should call function recipesApi.fetchIngredientsRequest failed', () => {
    jest.spyOn(Alert, 'alert');
    recipesApi.fetchIngredientsRequest = jest.fn().mockImplementation(() => {
      throw new Error('Network Error');
    });

    render(<IngredientsDetailsScreen navigation={navigation} route={{ params }} />);

    expect(Alert.alert).toHaveBeenCalledWith('Fetch data failed');
  });

  test('should call function handlePressIngredient', () => {
    const component = renderer.create(
      <IngredientsDetailsScreen navigation={navigation} route={{ params }} />
    );
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Ingredient.name, { ingredient });
  });
});
