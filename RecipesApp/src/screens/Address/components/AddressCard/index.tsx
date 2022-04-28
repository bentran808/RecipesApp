import AppStyles from 'AppStyles';
import Button from 'components/Button';
import React, { useCallback } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { AddressModel } from 'store/AddressStore';
import styles from './styles';

type Props = {
  item: AddressModel;
  source: ImageSourcePropType;
  onPressEdit: (item: AddressModel) => void;
  onPressDelete: (item: AddressModel) => void;
};

const AddressCard = ({ item, source, onPressEdit, onPressDelete }: Props) => {
  const handlePressEdit = useCallback(() => {
    onPressEdit(item);
  }, [item]);

  const handlePressDelete = useCallback(() => {
    onPressDelete(item);
  }, [item]);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Image source={source} style={styles.titleIcon} />
        <Text style={AppStyles.textBold}>{item.type}</Text>
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
      <View style={styles.buttonWrapper}>
        <Button
          testID="editBtn"
          type="outlined"
          color="red"
          borderColor="red"
          paddingVertical={5}
          title="EDIT"
          onPress={handlePressEdit}
          style={{
            borderRadius: 5
          }}
        />
        <Button
          testID="deleteBtn"
          type="outlined"
          color="red"
          borderColor="red"
          paddingVertical={5}
          paddingHorizontal={50}
          title="DELETE"
          onPress={handlePressDelete}
          style={{
            borderRadius: 5
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(AddressCard);
