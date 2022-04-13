import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import Input from 'components/Input';
import MenuButton from 'components/MenuButton';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import React, { useCallback, useLayoutEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { CloseIcon, SearchIcon } from 'theme';

type SearchNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: SearchNavigationProp & DrawerNavigationHelpers;
}

const SearchScreen = ({ navigation }: Props) => {
  const [keyword, setKeyword] = React.useState<string>('');
  const [recipes, setRecipes] = React.useState<Recipe[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuButton onPress={handlePressMenu} />,
      headerBackVisible: false,
      headerTitle: () => (
        <Input
          keyword={keyword}
          onChangeText={handleSearch}
          leftIcon={SearchIcon}
          rightIcon={CloseIcon}
          onPressRightIcon={handleClose}
        />
      )
    });
  }, [keyword]);

  const handlePressMenu = useCallback(() => {
    navigation.openDrawer();
  }, []);

  const handleClose = useCallback(() => {
    setKeyword('');
    setRecipes([]);
  }, []);

  const handleSearch = useCallback((text: string) => {
    setKeyword(text);
    setTimeout(async () => {
      try {
        const responses = await Promise.all([
          recipesApi.searchByCategoryNameRequest(text),
          recipesApi.searchByRecipeNameRequest(text)
        ]);
        const recipesOfCategory = responses[0].data
          .map((category: Category) => category.recipes.map((recipe) => ({ ...recipe, category })))
          .flat(1);
        const recipesData = responses[1].data;
        const uniqueRecipes = [
          ...new Map(
            [...recipesOfCategory, ...recipesData].map((item: Recipe) => [item['id'], item])
          ).values()
        ];

        setRecipes(uniqueRecipes);
      } catch (error) {
        Alert.alert('Search failed');
      }
    }, 1000);
  }, []);

  const handlePressRecipe = useCallback((item: Recipe) => {
    navigation.navigate(Screens.Recipe.name as 'Recipe', { item });
  }, []);

  const renderRecipes = ({ item }: { item: Recipe }) => (
    <RecipeCard item={item} onPressRecipe={handlePressRecipe} />
  );

  const renderKeyExtractor = (item: Recipe) => `${item.id}`;

  return (
    <View>
      <FlatList
        testID="recipesList"
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default SearchScreen;
