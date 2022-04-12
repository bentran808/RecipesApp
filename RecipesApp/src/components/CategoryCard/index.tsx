import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

type Props = {
  item: Category;
  onPressCategory: (item: Category) => void;
};

const CategoryCard = ({ item, onPressCategory }: Props) => {
  const handlePress = useCallback(() => {
    onPressCategory(item);
  }, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{item.recipes.length} recipes</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
