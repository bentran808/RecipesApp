import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type Props = {
  item: Recipe;
  onPressRecipe: (item: Recipe) => () => void;
};

const RecipeCard = ({ item, onPressRecipe }: Props) => {
  return (
    <TouchableOpacity onPress={onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RecipeCard, isEqual);
