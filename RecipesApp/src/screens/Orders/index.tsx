import AppStyles from 'AppStyles';
import Button from 'components/Button';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import OrderedItem from 'screens/Orders/components/OrderedItem';

type Props = {};
const mockData = [
  {
    items: [
      {
        item: {
          name: 'Product 1'
        },
        quantity: 1
      },
      {
        item: {
          name: 'Product 2'
        },
        quantity: 2
      }
    ],
    total: 60
  },
  {
    items: [
      {
        item: {
          name: 'Product 2'
        },
        quantity: 3
      },
      {
        item: {
          name: 'Product 3'
        },
        quantity: 2
      }
    ],
    total: 100
  }
];

const OrdersScreen = (props: Props) => {
  const renderCheckoutItem = ({ item }: { item: any }) => (
    <OrderedItem item={item} />
  );

  const renderKeyExtractor = (item: any, index: number) =>
    `${index}`;

  const renderSeparator = () => <View style={AppStyles.separator} />;

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <FlatList
        testID="orderedList"
        showsVerticalScrollIndicator={false}
        data={mockData}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderCheckoutItem}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default OrdersScreen;
