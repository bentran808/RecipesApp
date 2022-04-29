import Button from 'components/Button';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Image, Text, View } from 'react-native';
import { CartModel } from 'store/CartStore';
import styles from './styles';

type Props = {
  item: CartModel;
};

const CartItem = ({ item }: Props) => {
  const { cart } = useStore();

  const handleIncrease = useCallback(() => {
    const itemInCart = cart.hasInCart(item.item)
    itemInCart?.increase && itemInCart.increase();
  }, [item]);

  const handleDecrease = useCallback(() => {
    const itemInCart = cart.hasInCart(item.item)
    itemInCart?.decrease && itemInCart.decrease();
  }, [item]);

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          style={styles.photo}
          source={{
            uri: item.item.photo_url
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{item.item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$20</Text>
          <View style={styles.quantityContainer}>
            <Button
              testID="decreaseBtn"
              color="red"
              title="-"
              onPress={handleDecrease}
              fontSize={20}
            />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Button
              testID="increaseBtn"
              color="red"
              title="+"
              onPress={handleIncrease}
              fontSize={20}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(observer(CartItem), isEqual);
