import { fireEvent, render } from '@testing-library/react-native';
import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import renderer from 'react-test-renderer';
import store, { RootStore } from 'store/store';
import CartScreen from '..';

describe('Cart Screen Component', () => {
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
      ]
    },
    address: {}
  });
  const navigation: any = {
    navigate: jest.fn()
  };

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <CartScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with empty', () => {
    const tree = renderer
      .create(
        <StoreProvider value={store}>
          <CartScreen navigation={navigation} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call function handlePressCheckout', () => {
    const { getByTestId } = render(
      <StoreProvider value={appStore}>
        <CartScreen navigation={navigation} />
      </StoreProvider>
    );
    const button = getByTestId('checkoutBtn');

    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
