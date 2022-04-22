import Button from 'components/Button';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { CartInstance } from 'store/CartStore';
import CartItem from './components/CartItem';
import styles from './styles';

type Props = {};

const CartScreen = (props: Props) => {
  const { cart } = useStore();
  const totalCount = cart.inCartCount;

  const renderCartItem = ({ item }: { item: CartInstance }) => <CartItem item={item} />;

  const renderKeyExtractor = (item: CartInstance) => `${item.item.id}`;

  return (
    <View style={styles.container}>
      <FlatList
        testID="cartList"
        showsVerticalScrollIndicator={false}
        data={cart.recipes}
        renderItem={renderCartItem}
        keyExtractor={renderKeyExtractor}
      />
      {totalCount ? (
        <View style={styles.checkoutContainer}>
          <View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>{totalCount} Item</Text>
              <Text style={styles.priceText}>${totalCount * 20}</Text>
            </View>
            <Text style={styles.subTitle}>Extra charges may apply</Text>
          </View>
          <Button
            testID="checkoutBtn"
            color="red"
            type="contained"
            title="Checkout"
            bold
            paddingHorizontal={20}
            style={{
              borderRadius: 10
            }}
            onPress={() => {}}
          />
        </View>
      ) : null}
    </View>
  );
};

export default observer(CartScreen);
