import { fireEvent, render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';
import store from 'store/store';
import CartItem from '..';

const spyAlert: any = jest.spyOn(Alert, 'alert');

describe('Cart Item Component', () => {
  const props = {
    item: {
      item: recipe,
      quantity: 1,
      inCart: true
    }
  };

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={store}>
          <CartItem {...props} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handleIncrease', () => {
    store.cart.hasInCart = jest.fn();
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <CartItem {...props} />
      </StoreProvider>
    );
    const button = getByTestId('increaseBtn');

    fireEvent.press(button);

    expect(store.cart.hasInCart).toHaveBeenCalled();
  });

  test('should call function handleDecrease', () => {
    store.cart.hasInCart = jest.fn();
    const { getByTestId } = render(
      <StoreProvider value={store}>
        <CartItem {...props} />
      </StoreProvider>
    );
    const button = getByTestId('decreaseBtn');

    fireEvent.press(button);

    expect(store.cart.hasInCart).toHaveBeenCalled();
  });

  test('should call function handlePressDelete', () => {
    store.cart.hasInCart = jest.fn();
    const { getByText } = render(
      <StoreProvider value={store}>
        <CartItem {...props} />
      </StoreProvider>
    );

    const button = getByText('Delete');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalled();

    spyAlert.mock.calls[0][2][1].onPress();
    expect(store.cart.hasInCart).toHaveBeenCalled();
  });
});
