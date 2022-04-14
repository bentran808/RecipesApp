import Button from 'components/Button';
import renderer from 'react-test-renderer';

describe('Button Component', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(<Button testID="testID" title="Test" onPress={jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render contained button correctly', () => {
    const tree = renderer
      .create(<Button testID="testID" title="Test" type="contained" onPress={jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
