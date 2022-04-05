import BackButton from 'components/BackButton';
import renderer from 'react-test-renderer';

describe('Back Button Component', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<BackButton onPress={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
