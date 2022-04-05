import MenuItem from 'components/MenuItem';
import renderer from 'react-test-renderer';
import { HomeIcon } from 'theme';

describe('Menu Item Component', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(<MenuItem title="Home" onPress={jest.fn()} source={HomeIcon} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
