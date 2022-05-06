import { fireEvent, render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { address } from 'mocks';
import React from 'react';
import renderer from 'react-test-renderer';
import store from 'store/store';
import AddressModal from '..';

describe('Address Modal Component', () => {
  const navigation: any = {
    navigate: jest.fn()
  };
  const props = {
    navigation,
    data: address,
    modalVisible: true,
    onToggleModal: jest.fn(),
    renderSeparator: jest.fn().mockReturnValue(null)
  };

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={store}>
          <AddressModal {...props} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressAdd', () => {
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <AddressModal {...props} />
      </StoreProvider>
    );
    const button = getByTestId('addAddressBtn');
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('should call function handlePressChooseAddress', () => {
    const { getAllByTestId } = render(
      <StoreProvider value={store}>
        <AddressModal {...props} />
      </StoreProvider>
    );
    const button = getAllByTestId('chooseAddressBtn')[0];
    fireEvent.press(button);

    expect(props.onToggleModal).toHaveBeenCalled();
  });
});
