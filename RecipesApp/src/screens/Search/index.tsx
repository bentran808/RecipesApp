import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from 'components/Input';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { RecipeModel } from 'store/RecipesStore';
import { CloseIcon, SearchIcon } from 'theme';
import { debounce } from 'utils';

type SearchNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: SearchNavigationProp & DrawerNavigationHelpers;
}

const SearchScreen = ({ navigation }: Props) => {
  const { recipes, cart } = useStore();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Input
          keyword={recipes.keyword}
          onChangeText={handleChange}
          leftIcon={SearchIcon}
          rightIcon={CloseIcon}
          onPressRightIcon={handleClose}
        />
      )
    });
  }, [recipes.keyword]);

  useEffect(() => {
    if (isFocused) {
      recipes.setEmptyRecipes();
    }
  }, [isFocused]);

  const handleClose = useCallback(() => {
    recipes.setKeyword('');
    recipes.setEmptyRecipes();
  }, []);

  const handleSearch = (text: string) => {
    if (!text) {
      recipes.setEmptyRecipes();
      return;
    }

    recipes.setRefreshData();
    recipes.searchRecipeName(text);
    recipes.searchCategoryName(text);
  };

  const debounceHandleSearch = debounce(handleSearch, 500);

  const handleChange = useCallback((text: string) => {
    recipes.setKeyword(text);
    debounceHandleSearch(text);
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
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes.recipesJS}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default observer(SearchScreen);
