import AppStyles from 'AppStyles';
import Button from 'components/Button';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import styles from './styles';

type Props = {
  item: any;
};

const OrderedItem = ({ item }: Props) => {
  const title = item.items
    .map((orderedItem: any) => `${orderedItem.item.name} x ${orderedItem.quantity}`)
    .join(', ');

  return (
    <View style={{
        paddingBottom: 15
    }}>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={AppStyles.textBold}>{title}</Text>
          <Text style={[AppStyles.subText, styles.time]}>Datetime</Text>
        </View>
        <Text>${item.total.toFixed(2)}</Text>
      </View>
      <Button
        testID="reorderBtn"
        type="outlined"
        bold
        title="REORDER"
        paddingHorizontal={30}
        paddingVertical={5}
        color="red"
        borderColor="red"
        onPress={() => {}}
        style={styles.customBtn}
      />
    </View>
  );
};

export default React.memo(OrderedItem, isEqual);
