import Screens from 'constants/Screens';
import { recipe } from 'mocks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import SearchScreen from '..';

describe('Categories Screen', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
      openDrawer: jest.fn()
    };
    const setKeyword = jest.fn();
    const setRecipes = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    React.useState = jest
      .fn()
      .mockReturnValueOnce(['c', setKeyword])
      .mockReturnValueOnce([[recipe], setRecipes]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const tree = renderer.create(<SearchScreen navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressRecipe', () => {
    const component = renderer.create(<SearchScreen navigation={navigation} />);
    const button = component.root.findAllByType(TouchableOpacity)[0];

    button.props.onPress();

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Recipe.name, { item: recipe });
  });
});
