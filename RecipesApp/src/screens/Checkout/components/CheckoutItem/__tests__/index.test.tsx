import { StoreProvider } from 'context';
import { recipe } from 'mocks';
import React from 'react';
import renderer from 'react-test-renderer';
import store from 'store/store';
import CheckoutItem from '..';

describe('Checkout Item Component', () => {
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
          <CheckoutItem {...props} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
