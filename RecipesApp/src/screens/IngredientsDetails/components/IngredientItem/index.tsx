import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

type Props = {
  item: IngredientsDetails;
  onPressIngredient: () => void;
};

const IngredientItem = ({ item, onPressIngredient }: Props) => {
  return (
    <TouchableOpacity onPress={onPressIngredient}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={styles.quantity}>{item[1]}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(IngredientItem, isEqual);
