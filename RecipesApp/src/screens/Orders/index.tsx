import AppStyles from 'AppStyles';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, View } from 'react-native';
import OrderedItem from 'screens/Orders/components/OrderedItem';
import { OrderedModel } from 'store/CartStore';

type Props = {};

const OrdersScreen = (props: Props) => {
  const { cart } = useStore();

  const renderCheckoutItem = ({ item }: { item: OrderedModel }) => <OrderedItem item={item} />;

  const renderKeyExtractor = (item: OrderedModel, index: number) => `${index}`;

  const renderSeparator = () => <View style={AppStyles.separator} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <FlatList
        testID="orderedList"
        showsVerticalScrollIndicator={false}
        data={cart.orderedList}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderCheckoutItem}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default observer(OrdersScreen);
