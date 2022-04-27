import Button from 'components/Button';
import { useStore } from 'context';
import React from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { CartModel } from 'store/CartStore';
import CheckoutItem from './components/CheckoutItem';
import styles from './styles';

type Props = {};

const CheckoutScreen = (props: Props) => {
  const { cart } = useStore();

  const renderCheckoutItem = ({ item }: { item: CartModel }) => <CheckoutItem item={item} />;

  const renderKeyExtractor = (item: CartModel) => `${item.item.id}`;

  const renderSeparator = () => <View style={styles.separator} />;

  const renderFooter = () => (
    <View style={styles.footer}>
      <View>
        <Text style={styles.sectionText}>Bill Details</Text>
        <View style={styles.itemWrapper}>
          <Text style={styles.subText}>Item Total</Text>
          <Text style={styles.textBold}>${cart.total.toFixed(2)}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.subText}>Delivery Fee</Text>
          <Text style={styles.textBold}>$5.00</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.subText}>Offer 10% OFF</Text>
          <Text style={styles.textBold}>- ${(cart.total * 0.1).toFixed(2)}</Text>
        </View>
      </View>
      {renderSeparator()}
      <View style={styles.toPayWrapper}>
        <Text style={styles.textBold}>To Pay</Text>
        <Text style={styles.textBold}>${cart.total + 5 - cart.total * 0.1}</Text>
      </View>
      {renderSeparator()}
      <View style={styles.discountWrapper}>
        <TextInput style={styles.discountInput} placeholder="Enter discount code" />
        <Button
          testID="applyBtn"
          disabled
          type="contained"
          title="APPLY"
          onPress={() => {}}
          paddingVertical={7}
          paddingHorizontal={30}
          style={{
            borderRadius: 10
          }}
        />
      </View>
      {renderSeparator()}
      <View style={styles.addressWrapper}>
        <View style={styles.addressControl}>
          <Text style={styles.textBold}>Deliver To Home</Text>
          <Button
            testID="changeAddressBtn"
            color="black"
            fontSize={12}
            title="CHANGE"
            onPress={() => {}}
          />
        </View>
        <Text style={styles.addressText}>448 Trung Nu Vuong</Text>
        <Button
          testID="paymentBtn"
          color="red"
          type="contained"
          title="MAKE PAYMENT"
          style={{
            borderRadius: 10
          }}
          onPress={() => {}}
        />
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          testID="checkoutList"
          showsVerticalScrollIndicator={false}
          data={cart.recipesInCart}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderCheckoutItem}
          keyExtractor={renderKeyExtractor}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
};

export default CheckoutScreen;
