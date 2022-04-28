import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from 'components/Button';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import React from 'react';
import { FlatList, Modal, Text, TextInput, View } from 'react-native';
import { CartModel } from 'store/CartStore';
import { width } from 'theme';
import CheckoutItem from './components/CheckoutItem';
import styles from './styles';
import AppStyles from 'AppStyles';
import { AddressModel } from 'store/AddressStore';
import { observer } from 'mobx-react-lite';

type CheckoutNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: CheckoutNavigationProp;
};

const CheckoutScreen = ({ navigation }: Props) => {
  const { cart, address } = useStore();
  const [modalVisible, setModalVisible] = React.useState(false);
  const billDetails = [
    {
      type: 'total',
      name: 'Item Total',
      price: cart.total
    },
    {
      type: 'fee',
      name: 'Delivery Fee',
      price: 5
    },
    {
      type: 'discount',
      name: 'Offer 10% OFF',
      price: cart.total * 0.1
    }
  ];

  const renderCheckoutItem = ({ item }: { item: CartModel }) => <CheckoutItem item={item} />;

  const renderKeyExtractor = (item: CartModel) => `${item.item.id}`;

  const renderSeparator = () => <View style={AppStyles.separator} />;

  const renderFooter = () => (
    <View style={styles.footer}>
      <View>
        <Text style={styles.sectionText}>Bill Details</Text>
        {billDetails.map((detail, index) => (
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
          <Text style={AppStyles.textBold}>Deliver To Home</Text>
          <Button
            testID="changeAddressBtn"
            color="black"
            fontSize={12}
            title="CHANGE"
            onPress={() => {
              setModalVisible(true);
            }}
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={address.addresses}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={() => <Text>Choose your address for delivery</Text>}
                ListEmptyComponent={() => (
                  <Button
                    testID="addAddressBtn"
                    type="contained"
                    title="Add New Address"
                    color="red"
                    paddingHorizontal={30}
                    onPress={() => {
                      navigation.navigate(Screens.Address.name as 'Address');
                    }}
                    style={{
                      marginTop: 20
                    }}
                  />
                )}
                renderItem={({ item }: { item: AddressModel }) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 10,
                      width: width - 100
                    }}
                  >
                    <View>
                      <Text style={AppStyles.textBold}>{item.type}</Text>
                      <Text>{item.address}</Text>
                    </View>
                    <Button
                      testID="chooseAddressBtn"
                      type="outlined"
                      color="red"
                      borderColor="red"
                      paddingVertical={5}
                      paddingHorizontal={20}
                      title="Choose"
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => `${item.type}-${index}`}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default observer(CheckoutScreen);
