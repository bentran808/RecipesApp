import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppStyles from 'AppStyles';
import Button from 'components/Button';
import { coupons } from 'constants/Data';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { FlatList, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import AddressModal from 'screens/Checkout/components/AddressModal';
import { CartModel } from 'store/CartStore';
import { formatDatetime } from 'utils';
import CheckoutItem from './components/CheckoutItem';
import styles from './styles';

type CheckoutNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: CheckoutNavigationProp;
};

const CheckoutScreen = ({ navigation }: Props) => {
  const { cart, address } = useStore();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleToggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const handlePressApply = useCallback(() => {
    const coupon = cart.discountInput?.toUpperCase();
    const validCoupon = coupons.includes(coupon);

    if (validCoupon) {
      switch (coupon) {
        case 'FREESHIP':
          cart.applyCoupon({
            type: 'discount',
            name: 'Free Ship',
            code: coupon,
            price: 5
          });
          break;
        case 'GET10OFF':
          cart.applyCoupon({
            type: 'discount',
            name: 'Offer 10% OFF',
            code: coupon,
            price: cart.total * 0.1
          });
          break;
        case 'GET20OFF':
          cart.applyCoupon({
            type: 'discount',
            name: 'Offer 20% OFF',
            code: coupon,
            price: cart.total * 0.2
          });
          break;

        default:
          break;
      }
      cart.setDiscountInput('');
    }
  }, []);

  const handlePressPayment = useCallback(() => {
    const today = new Date();
    cart.payment({
      items: cart.recipesInCart.map((item) => ({ name: item.item.title, quantity: item.quantity })),
      total: cart.toPay,
      createdAt: formatDatetime(today)
    });
    navigation.navigate(Screens.Orders.name as 'Orders');
  }, []);

  const renderCheckoutItem = ({ item }: { item: CartModel }) => <CheckoutItem item={item} />;

  const renderKeyExtractor = (item: CartModel) => `${item.item.id}`;

  const renderSeparator = () => <View style={AppStyles.separator} />;

  const renderFooter = () => {
    const typeUsing = address.itemUsing?.type || address.addresses[0]?.type;
    const addressUsing = address.itemUsing?.address || address.addresses[0]?.address;

    return (
      <ScrollView style={styles.footer}>
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
          <Text style={AppStyles.textBold}>${cart.toPay}</Text>
        </View>
        {renderSeparator()}
        <View style={styles.discountWrapper}>
          <TextInput
            style={styles.discountInput}
            placeholder="Enter discount code"
            value={cart.discountInput}
            onChangeText={cart.setDiscountInput}
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
            <Text style={AppStyles.textBold}>Deliver To {typeUsing}</Text>
            <Button
              testID="changeAddressBtn"
              color="black"
              fontSize={12}
              title="CHANGE"
              onPress={handleToggleModal}
            />
          </View>
          <Text style={styles.addressText}>{addressUsing}</Text>
          <Button
            testID="paymentBtn"
            color="red"
            type="contained"
            title="MAKE PAYMENT"
            style={{
              borderRadius: 10
            }}
            disabled={!addressUsing}
            onPress={handlePressPayment}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          testID="checkoutList"
          showsVerticalScrollIndicator={false}
          data={cart.recipesInCart}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderCheckoutItem}
          keyExtractor={renderKeyExtractor}
        />
        {renderFooter()}
        <AddressModal
          navigation={navigation}
          data={address.addresses}
          modalVisible={modalVisible}
          onToggleModal={handleToggleModal}
          renderSeparator={renderSeparator}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default observer(CheckoutScreen);
