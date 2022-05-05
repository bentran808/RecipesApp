import { StoreProvider } from 'context';
import { address } from 'mocks';
import React from 'react';
import renderer from 'react-test-renderer';
import { RootStore } from 'store/store';
import AddressScreen from '..';

describe('Address Screen Component', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {},
    ingredients: {},
    cart: {},
    address: {
      items: address
    }
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={appStore}>
          <AddressScreen />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
