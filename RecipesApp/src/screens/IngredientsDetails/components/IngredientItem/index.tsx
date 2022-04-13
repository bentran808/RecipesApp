import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  item: IngredientsDetails;
  onPressIngredient: (item: IngredientsDetails) => void;
}

const IngredientItem = ({ item, onPressIngredient }: Props) => {
  const handlePress = useCallback(() => {
    onPressIngredient(item);
  }, [item]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={styles.quantity}>{item[1]}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(IngredientItem, isEqual);
