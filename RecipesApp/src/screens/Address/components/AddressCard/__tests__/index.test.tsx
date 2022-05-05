import { fireEvent, render } from '@testing-library/react-native';
import { address } from 'mocks';
import renderer from 'react-test-renderer';
import { HomeIcon } from 'theme';
import AddressCard from '..';

describe('Address Card Component', () => {
  const props = {
    item: address[0],
    source: HomeIcon,
    onPressEdit: jest.fn(),
    onPressDelete: jest.fn()
  };

  test('should render correctly', () => {
    const tree = renderer.create(<AddressCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressEdit', () => {
    const { getByTestId } = render(<AddressCard {...props} />);
    const button = getByTestId('editBtn');

    fireEvent.press(button);

    expect(props.onPressEdit).toHaveBeenCalled();
  });

  test('should call function handlePressDelete', () => {
    const { getByTestId } = render(<AddressCard {...props} />);
    const button = getByTestId('deleteBtn');

    fireEvent.press(button);

    expect(props.onPressDelete).toHaveBeenCalled();
  });
});
