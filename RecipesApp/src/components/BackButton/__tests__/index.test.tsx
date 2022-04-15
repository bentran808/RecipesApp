import BackButton from 'components/BackButton';
import renderer from 'react-test-renderer';
import { BackArrow } from 'theme';

describe('Back Button Component', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<BackButton source={BackArrow} onPress={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
