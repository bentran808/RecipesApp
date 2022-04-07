import Screens from 'constants/Screens';
import { TouchableHighlight } from 'react-native';
import renderer from 'react-test-renderer';
import DrawerContainer from 'screens/DrawerContainer';

describe('Drawer Container', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      closeDrawer: jest.fn()
    };
  });

  test('should render correctly', () => {
    const tree = renderer.create(<DrawerContainer navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressHome', () => {
    const component = renderer.create(<DrawerContainer navigation={navigation} />);
    const button = component.root.findAllByType(TouchableHighlight)[0];
    button.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Home.name);
  });

  test('should call function handlePressCategories', () => {
    const component = renderer.create(<DrawerContainer navigation={navigation} />);
    const button = component.root.findAllByType(TouchableHighlight)[1];
    button.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Categories.name);
  });

  test('should call function handlePressSearch', () => {
    const component = renderer.create(<DrawerContainer navigation={navigation} />);
    const button = component.root.findAllByType(TouchableHighlight)[2];
    button.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith(Screens.Search.name);
  });
});
