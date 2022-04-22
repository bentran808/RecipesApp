import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuButton from 'components/MenuButton';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { RecipeModel } from 'store/RecipesStore';
import { BasketIcon } from 'theme';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: HomeNavigationProp & DrawerNavigationHelpers;
}

const HomeScreen = ({ navigation }: Props) => {
  const { recipes, cart } = useStore();
  const badgeCount = cart.inCartCount;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton
          source={BasketIcon}
          onPress={handlePressCart}
          badge={!!badgeCount}
          badgeCount={badgeCount}
        />
      )
    });
  }, [badgeCount]);

  useEffect(() => {
    recipes.fetchRecipes(1);
  }, []);

  const handleRefreshing = useCallback(async () => {
    recipes.fetchRecipes(1);
  }, []);

  const getRecipes = async () => {
    recipes.fetchRecipes(recipes.currentPage);
  };

  const handlePressCart = () => {
    navigation.navigate(Screens.Cart.name);
  };

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
        data={recipes.recipesJS}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
        onEndReached={getRecipes}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default observer(HomeScreen);
