import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  item: Recipe;
  onPressRecipe: (item: Recipe) => void;
}

const RecipeCard = ({ item, onPressRecipe }: Props) => {
  const handlePress = useCallback(() => {
    onPressRecipe(item);
  }, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RecipeCard, isEqual);
