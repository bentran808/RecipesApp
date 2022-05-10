import { fireEvent, render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import renderer from 'react-test-renderer';
import store, { RootStore } from 'store/store';
import CheckoutScreen from '..';

describe('Checkout Screen Component', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {},
    ingredients: {},
    cart: {
      items: [
        {
          item: recipe,
          quantity: 1,
          inCart: true
        }
      ],
      billItems: [
        {
          type: 'total',
          name: 'Item Total',
          code: 'TOTAL',
          price: 20
        },
        {
          type: 'fee',
          name: 'Delivery Fee',
          code: 'DELIVER',
          price: 5
        },
        {
          type: 'discount',
          name: 'Free Ship',
          code: 'FREESHIP',
          price: 5
        }
      ]
    },
    address: {
      itemUsing: {
        id: 0,
        type: 'Work',
        address: '604 NT'
      }
    }
  });
  const navigation: any = {
    navigate: jest.fn()
  };

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <CheckoutScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with error message', () => {
    appStore.cart.isInvalidCoupon(true);
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <CheckoutScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressApply with invalid coupon', () => {
    store.cart.isInvalidCoupon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <StoreProvider value={store}>
        <CheckoutScreen navigation={navigation} />
      </StoreProvider>
    );

    const input = getByPlaceholderText('Enter discount code');
    fireEvent.changeText(input, 'a');

    const button = getByTestId('applyBtn');
    fireEvent.press(button);

    expect(store.cart.isInvalidCoupon).toHaveBeenCalled();
  });

  test('should call function handlePressApply with coupon freeship', () => {
    store.cart.applyCoupon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <StoreProvider value={store}>
        <CheckoutScreen navigation={navigation} />
      </StoreProvider>
    );

    const input = getByPlaceholderText('Enter discount code');
    fireEvent.changeText(input, 'freeship');

    const button = getByTestId('applyBtn');
    fireEvent.press(button);

    expect(store.cart.applyCoupon).toHaveBeenCalledWith({
      code: 'FREESHIP',
      name: 'Free Ship',
      price: 5,
      type: 'discount'
    });
  });

  test('should call function handlePressApply with coupon get10off', () => {
    store.cart.applyCoupon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <StoreProvider value={store}>
        <CheckoutScreen navigation={navigation} />
      </StoreProvider>
    );

    const input = getByPlaceholderText('Enter discount code');
    fireEvent.changeText(input, 'get10off');

    const button = getByTestId('applyBtn');
    fireEvent.press(button);

    expect(store.cart.applyCoupon).toHaveBeenCalledWith({
      code: 'GET10OFF',
      name: 'Offer 10% OFF',
      price: 0,
      type: 'discount'
    });
  });

  test('should call function handlePressApply with coupon get20off', () => {
    store.cart.applyCoupon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <StoreProvider value={store}>
        <CheckoutScreen navigation={navigation} />
      </StoreProvider>
    );

    const input = getByPlaceholderText('Enter discount code');
    fireEvent.changeText(input, 'get20off');

    const button = getByTestId('applyBtn');
    fireEvent.press(button);

    expect(store.cart.applyCoupon).toHaveBeenCalledWith({
      code: 'GET20OFF',
      name: 'Offer 20% OFF',
      price: 0,
      type: 'discount'
    });
  });

  test('should call function handlePressPayment', () => {
    const { getByTestId } = render(
      <StoreProvider value={appStore}>
        <CheckoutScreen navigation={navigation} />
      </StoreProvider>
    );
    const button = getByTestId('paymentBtn');
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
