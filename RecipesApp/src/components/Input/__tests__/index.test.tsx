import Input from 'components/Input';
import { Pressable } from 'react-native';
import renderer from 'react-test-renderer';
import { CloseIcon, SearchIcon } from 'theme';

describe('Input Component', () => {
  const onChangeText = jest.fn();
  const onPressLeftIcon = jest.fn();
  const onPressRightIcon = jest.fn();
  const component = renderer.create(
    <Input
      keyword={''}
      onChangeText={onChangeText}
      leftIcon={SearchIcon}
      rightIcon={CloseIcon}
      onPressLeftIcon={onPressLeftIcon}
      onPressRightIcon={onPressRightIcon}
    />
  );
  test('should render correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressLeftIcon', () => {
    const button = component.root.findAllByType(Pressable)[0];

    button.props.onPress();

    expect(onPressLeftIcon).toHaveBeenCalled();
  });

  test('should call function handlePressRightIcon', () => {
    const button = component.root.findAllByType(Pressable)[1];

    button.props.onPress();

    expect(onPressRightIcon).toHaveBeenCalled();
  });
});
