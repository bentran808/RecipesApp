import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, FlatList, Image, Text, View } from 'react-native';
import { getRecipesByIngredient } from 'utils';
import styles from './styles';

type IngredientNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: IngredientNavigationProp;
  route: {
    params: {
      ingredient: Ingredient;
    };
  };
};

const IngredientScreen = ({ navigation, route }: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>();
  const { id, name, photo_url } = route.params.ingredient;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name
    });
  }, []);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await recipesApi.fetchRecipesRequest();
        setRecipes(getRecipesByIngredient(response.data, id));
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
    };

    getAllRecipes();
  }, []);

  const handleRefreshing = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await recipesApi.fetchRecipesRequest();
      setRecipes(response.data);
    } catch (error) {
      Alert.alert('Fetch data failed');
    }
    setRefreshing(false);
  }, []);

  const handlePressRecipe = useCallback(
    (item: Recipe) => () => {
      navigation.navigate(Screens.Recipe.name as 'Recipe', { item });
    },
    []
  );

  const renderRecipes = ({ item }: { item: Recipe }) => (
    <RecipeCard item={item} onPressRecipe={handlePressRecipe} />
  );

  const renderKeyExtractor = (item: Recipe) => `${item.id}`;

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

export default IngredientScreen;
