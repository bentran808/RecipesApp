import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppStyles from 'AppStyles';
import Button from 'components/Button';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import AddressModal from 'screens/Checkout/components/AddressModal';
import { CartModel } from 'store/CartStore';
import CheckoutItem from './components/CheckoutItem';
import styles from './styles';

type CheckoutNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: CheckoutNavigationProp;
};

const CheckoutScreen = ({ navigation }: Props) => {
  const { cart, address } = useStore();
  const [modalVisible, setModalVisible] = React.useState(false);
  const coupons = ['FREESHIP', 'GET10OFF', 'GET20OFF'];

  const handleToggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const handleChange = useCallback((text: string) => {
    cart.setDiscountInput(text);
  }, []);

  const handlePressApply = useCallback(() => {
    const coupon = cart.discountInput?.toUpperCase();
    const validCoupon = coupons.includes(coupon);

    if (validCoupon) {
      switch (coupon) {
        case 'FREESHIP':
          cart.applyCoupon({
            type: 'discount',
            name: 'Free Ship',
            price: 5
          });
          break;
        case 'GET10OFF':
          cart.applyCoupon({
            type: 'discount',
            name: 'Offer 10% OFF',
            price: cart.total * 0.1
          });
          break;
        case 'GET20OFF':
          cart.applyCoupon({
            type: 'discount',
            name: 'Offer 20% OFF',
            price: cart.total * 0.2
          });
          break;

        default:
          break;
      }
    }
  }, []);

  const renderCheckoutItem = ({ item }: { item: CartModel }) => <CheckoutItem item={item} />;

  const renderKeyExtractor = (item: CartModel) => `${item.item.id}`;

  const renderSeparator = () => <View style={AppStyles.separator} />;

  const renderFooter = () => (
    <View style={styles.footer}>
      <View>
        <Text style={styles.sectionText}>Bill Details</Text>
        {cart.billDetails.map((detail, index) => (
          <View key={`${detail.type}-${index}`} style={styles.itemWrapper}>
            <Text style={AppStyles.subText}>{detail.name}</Text>
            <Text style={AppStyles.textBold}>
              {detail.type === 'discount' ? '- ' : ''}${detail.price.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      {renderSeparator()}
      <View style={styles.toPayWrapper}>
        <Text style={AppStyles.textBold}>To Pay</Text>
        <Text style={AppStyles.textBold}>${cart.total + 5 - cart.total * 0.1}</Text>
      </View>
      {renderSeparator()}
      <View style={styles.discountWrapper}>
        <TextInput
          style={styles.discountInput}
          placeholder="Enter discount code"
          value={cart.discountInput}
          onChangeText={handleChange}
        />
        <Button
          testID="applyBtn"
          disabled={!cart.discountInput}
          type="contained"
          title="APPLY"
          onPress={handlePressApply}
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
          <Text style={AppStyles.textBold}>Deliver To {address.itemUsing?.type}</Text>
          <Button
            testID="changeAddressBtn"
            color="black"
            fontSize={12}
            title="CHANGE"
            onPress={handleToggleModal}
          />
        </View>
        <Text style={styles.addressText}>{address.itemUsing?.address}</Text>
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
        <AddressModal
          navigation={navigation}
          data={address.addresses}
          modalVisible={modalVisible}
          onToggleModal={handleToggleModal}
          renderSeparator={renderSeparator}
        />
      </View>
    </>
  );
};

export default observer(CheckoutScreen);
