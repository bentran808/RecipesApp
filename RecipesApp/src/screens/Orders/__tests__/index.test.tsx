import { StoreProvider } from 'context';
import React from 'react';
import renderer from 'react-test-renderer';
import { RootStore } from 'store/store';
import OrdersScreen from '..';

describe('Orders Screen Component', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {},
    ingredients: {},
    cart: {
      orderedItems: [
        {
          items: [
            {
              name: 'test',
              quantity: 2
            }
          ],
          total: 40,
          createdAt: ''
        },
        {
          items: [
            {
              name: 'test 2',
              quantity: 1
            }
          ],
          total: 20,
          createdAt: ''
        }
      ]
    },
    address: {}
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <OrdersScreen />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
