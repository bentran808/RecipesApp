import AppStyles from 'AppStyles';
import Button from 'components/Button';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
import { AddressModel } from 'store/AddressStore';
import { HomeIcon, SuitcaseIcon } from 'theme';
import AddressCard from './components/AddressCard';
import styles from './styles';

type Props = {};

const AddressScreen = (props: Props) => {
  const { address } = useStore();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [items, setItems] = React.useState([
    { label: 'Home', value: 'Home' },
    { label: 'Work', value: 'Work' }
  ]);
  const [itemEditing, setItemEditing] = React.useState<AddressModel>();

  const handleToggleModal = useCallback(() => setModalVisible(!modalVisible), [modalVisible]);

  const handlePressConfirm = useCallback(() => {
    const existAddress = address.existAddress(itemEditing);

    existAddress?.edit
      ? existAddress.edit(value, address.address)
      : address.addNewItem(value, address.address);

    setValue('');
    setModalVisible(false);
    setItemEditing(undefined);
    address.setAddress('');
  }, [value, address.address, itemEditing]);

  const handlePressEdit = useCallback((item: AddressModel) => {
    setModalVisible(true);
    setValue(item.type);
    setItemEditing(item);
    address.setAddress(item.address);
  }, []);

  const handlePressDelete = useCallback((item: AddressModel) => {
    const existAddress = address.existAddress(item);
    existAddress?.remove && existAddress.remove();
  }, []);

  const renderSeparator = () => <View style={AppStyles.separator} />;

  const renderCheckoutItem = ({ item }: { item: AddressModel }) => {
    let source;
    switch (item.type) {
      case 'Home':
        source = HomeIcon;
        break;
      case 'Work':
        source = SuitcaseIcon;

      default:
        break;
    }
    return (
      <AddressCard
        item={item}
        source={source}
        onPressEdit={handlePressEdit}
        onPressDelete={handlePressDelete}
      />
    );
  };

  const renderKeyExtractor = (item: AddressModel, index: number) => `${item.type}-${index}`;

  const renderFooter = () => (
    <Button
      testID="addBtn"
      type="contained"
      color="red"
      title="ADD NEW"
      onPress={handleToggleModal}
      style={styles.btnCustom}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        testID="addressList"
        showsVerticalScrollIndicator={false}
        data={address.addresses}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderCheckoutItem}
        keyExtractor={renderKeyExtractor}
        ListFooterComponent={renderFooter}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleToggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>ADD NEW ADDRESS</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            <TextInput
              value={address.address}
              onChangeText={address.setAddress}
              style={styles.modalInput}
            />
            <Button
              testID="confirmBtn"
              type="contained"
              color="red"
              title="Confirm"
              disabled={!address.address}
              onPress={handlePressConfirm}
              style={styles.btnCustom}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default observer(AddressScreen);
