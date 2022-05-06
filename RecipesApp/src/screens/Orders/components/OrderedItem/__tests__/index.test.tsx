import { StoreProvider } from 'context';
import React from 'react';
import renderer from 'react-test-renderer';
import store from 'store/store';
import OrderedItem from '..';

describe('Ordered Item Component', () => {
  const props = {
    item: {
      items: [
        {
          name: 'test',
          quantity: 2
        }
      ],
      total: 40,
      createdAt: ''
    }
  };

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <StoreProvider value={store}>
          <OrderedItem {...props} />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
