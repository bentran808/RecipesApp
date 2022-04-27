import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from 'components/Button';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { CartModel } from 'store/CartStore';
import CartItem from './components/CartItem';
import styles from './styles';

type CartNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: CartNavigationProp;
};

const CartScreen = ({ navigation }: Props) => {
  const { cart } = useStore();
  const totalCount = cart.inCartCount;

  const handlePressCheckout = useCallback(() => {
    navigation.navigate(Screens.Checkout.name as 'Checkout');
  }, []);

  const renderCartItem = ({ item }: { item: CartModel }) => <CartItem item={item} />;

  const renderKeyExtractor = (item: CartModel) => `${item.item.id}`;

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
              <Text style={styles.priceText}>${cart.total}</Text>
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
            onPress={handlePressCheckout}
          />
        </View>
      ) : null}
    </View>
  );
};

export default observer(CartScreen);
