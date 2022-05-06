import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppStyles from 'AppStyles';
import Button from 'components/Button';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React from 'react';
import isEqual from 'react-fast-compare';
import { FlatList, Modal, Text, View } from 'react-native';
import { AddressModel } from 'store/AddressStore';
import styles from './styles';

type AddressModalNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: AddressModalNavigationProp;
  modalVisible: boolean;
  onToggleModal: () => void;
  renderSeparator: () => JSX.Element;
  data: AddressModel[];
};

const AddressModal = ({
  navigation,
  data,
  modalVisible,
  onToggleModal,
  renderSeparator
}: Props) => {
  const { address } = useStore();

  const handlePressChooseAddress = (item: AddressModel) => () => {
    onToggleModal();
    address.setItemUsing(item);
  };

  const handlePressAdd = () => {
    navigation.navigate(Screens.Address.name as 'Address');
  };

  const renderHeader = () => <Text>Choose your address for delivery</Text>;

  const renderEmptyList = () => (
    <Button
      testID="addAddressBtn"
      type="contained"
      title="Add New Address"
      color="red"
      paddingHorizontal={30}
      onPress={handlePressAdd}
      style={{
        marginTop: 20
      }}
    />
  );

  const renderAddressItem = ({ item }: { item: AddressModel }) => (
    <View style={styles.addressWrapper}>
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
        onPress={handlePressChooseAddress(item)}
      />
    </View>
  );
  const renderKeyExtractor = (item: AddressModel, index: number) => `${item.type}-${index}`;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onToggleModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderEmptyList}
            renderItem={renderAddressItem}
            keyExtractor={renderKeyExtractor}
          />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(observer(AddressModal), isEqual);
