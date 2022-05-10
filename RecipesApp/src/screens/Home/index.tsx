import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuButton from 'components/MenuButton';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import Reactotron from 'reactotron-react-native'
import { RecipeModel } from 'store/RecipesStore';
import { BasketIcon } from 'theme';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: HomeNavigationProp & DrawerNavigationHelpers;
}

const HomeScreen = ({ navigation }: Props) => {
  const { recipes, cart } = useStore();
  const badgeCount = cart.inCartCount;
  const isFocused = useIsFocused();

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
    if (isFocused) {
      recipes.fetchRecipes(1);
    }
  }, [isFocused]);

  useEffect(() => {
    if (recipes.state === 'error') {
      Alert.alert('Error', 'Failed to fetching recipes');
    }
  }, [recipes.state]);

  const handleRefreshing = useCallback(() => {
    recipes.setRefreshData();
    recipes.fetchRecipes(1);
  }, []);

  const getRecipes = useCallback(() => {
    if (isFocused) {
      recipes.fetchRecipes(recipes.currentPage);
    }
  }, [isFocused]);

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
