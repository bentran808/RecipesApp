import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { RecipeModel } from 'store/RecipesStore';
import { getRecipesByIngredient } from 'utils';
import styles from './styles';

type RootStackParamList = {
  Recipe: {
    item: RecipeModel;
  };
};
type IngredientNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: IngredientNavigationProp;
  route: {
    params: {
      ingredient: Ingredient;
    };
  };
}

const IngredientScreen = ({ navigation, route }: Props) => {
  const { recipes, cart } = useStore();
  const { id, name, photo_url } = route.params.ingredient;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name
    });
  }, [name]);

  useEffect(() => {
    if (!recipes.recipesJS.length) {
      recipes.fetchRecipes();
    }
  }, []);

  const handleRefreshing = useCallback(async () => {
    recipes.fetchRecipes();
  }, []);

  const handlePressRecipe = useCallback((item: RecipeModel) => {
    navigation.navigate(Screens.Recipe.name as 'Recipe', { item });
  }, []);

  const handleAddToCart = useCallback((item: RecipeModel) => {
    cart.addToCart(item);
  }, []);

  const renderRecipes = ({ item }: { item: RecipeModel }) => (
    <RecipeCard item={item} onPressRecipe={handlePressRecipe} onPressCart={handleAddToCart} />
  );

  const renderKeyExtractor = (item: RecipeModel) => `${item.id}`;

  return (
    <View>
      <FlatList
        testID="recipesList"
        ListHeaderComponent={
          <>
            <View style={styles.photoContainer}>
              <Image style={styles.photoIngredient} source={{ uri: photo_url }} />
            </View>
            <Text style={styles.ingredientInfo}>Recipes with {name}:</Text>
          </>
        }
        refreshing={recipes.state === 'pending'}
        onRefresh={handleRefreshing}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={getRecipesByIngredient(recipes.recipesJS, id)}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default observer(IngredientScreen);
