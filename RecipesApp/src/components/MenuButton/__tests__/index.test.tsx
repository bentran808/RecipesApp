import MenuButton from 'components/MenuButton';
import renderer from 'react-test-renderer';

describe('Menu Button Component', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<MenuButton onPress={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
