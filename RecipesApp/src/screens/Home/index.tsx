import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import MenuButton from 'components/MenuButton';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: HomeNavigationProp & DrawerNavigationHelpers;
};

const HomeScreen = ({ navigation }: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuButton
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )
    });
  }, []);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await recipesApi.fetchRecipesRequest();
        setRecipes(response.data);
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

export default HomeScreen;
