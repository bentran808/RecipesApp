import Button from 'components/Button';
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { CartInstance } from 'store/CartStore';
import styles from './styles';

type Props = {
  item: CartInstance;
};

const CartItem = ({ item }: Props) => {
  const handleIncrease = useCallback(() => {
    item.increase && item.increase();
  }, [item]);

  const handleDecrease = useCallback(() => {
    item.decrease && item.decrease();
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

export default React.memo(CartItem);
