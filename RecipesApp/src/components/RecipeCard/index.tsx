import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RecipeModel } from 'store/RecipesStore';
import { CartIcon } from 'theme';
import styles from './styles';

interface Props {
  item: RecipeModel;
  onPressRecipe: (item: RecipeModel) => void;
  onPressCart: (item: RecipeModel) => void;
}

const RecipeCard = ({ item, onPressRecipe, onPressCart }: Props) => {
  const handlePress = useCallback(() => {
    onPressRecipe(item);
  }, [item]);

  const handlePressCart = useCallback(() => {
    onPressCart(item);
  }, [item]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item?.category?.name || ''}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>$20</Text>
          <TouchableOpacity testID='cartBtn' onPress={handlePressCart}>
            <Image style={styles.cart} source={CartIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RecipeCard, isEqual);
