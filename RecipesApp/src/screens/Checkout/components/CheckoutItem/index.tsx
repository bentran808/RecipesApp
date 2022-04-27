import React from 'react';
import { Text, View } from 'react-native';
import { CartModel } from 'store/CartStore';
import styles from './styles';

type Props = {
  item: CartModel;
};

const CheckoutItem = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.item.title}</Text>
        <Text style={styles.subTitle}>Regular</Text>
      </View>
      <View style={styles.quantityWrapper}>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <Text>${item.quantity * 20}</Text>
      </View>
    </View>
  );
};

export default React.memo(CheckoutItem);
