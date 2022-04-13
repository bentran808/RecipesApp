import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';

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
  const [refreshing, setRefreshing] = React.useState(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>();
  const { category } = route.params;
  const title = category.name;
  const categoryId = category.id;
  const recipesOfCategory = category.recipes;

  useLayoutEffect(() => {
    navigation.setOptions({
      title
    });
  }, []);

  useEffect(() => {
    const getRecipesByCategoryId = async () => {
      try {
        const response = await recipesApi.fetchRecipesByCategoryIdRequest(categoryId);
        setRecipes(response.data);
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
    };

    if (recipesOfCategory?.length) {
      setRecipes(recipesOfCategory);
    } else {
      getRecipesByCategoryId();
    }
  }, []);

  const handleRefreshing = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await recipesApi.fetchRecipesByCategoryIdRequest(categoryId);
      setRecipes(response.data);
    } catch (error) {
      Alert.alert('Fetch data failed');
    }
    setRefreshing(false);
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
        refreshing={refreshing}
        onRefresh={handleRefreshing}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default RecipesListScreen;
