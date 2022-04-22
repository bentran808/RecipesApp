import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { RecipeModel } from 'store/RecipesStore';

type RootStackParamList = {
  Recipe: {
    item: RecipeModel;
  };
};
type RecipesListNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: RecipesListNavigationProp;
  route: {
    params: {
      category: Category;
    };
  };
}

const RecipesListScreen = ({ navigation, route }: Props) => {
  const { recipes, cart } = useStore();
  const { category } = route.params;
  const title = category.name;
  const categoryId = category.id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title
    });
  }, [title]);

  useEffect(() => {
    recipes.fetchRecipesByCategoryId(categoryId);
  }, [categoryId]);

  const handleRefreshing = useCallback(async () => {
    recipes.fetchRecipesByCategoryId(categoryId);
  }, [categoryId]);

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
        refreshing={recipes.state === 'pending'}
        onRefresh={handleRefreshing}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes.recipesOfCategoryJS}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default observer(RecipesListScreen);
