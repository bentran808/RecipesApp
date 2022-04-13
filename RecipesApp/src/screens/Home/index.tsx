import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import styles from './styles';
import MenuButton from 'components/MenuButton';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: HomeNavigationProp & DrawerNavigationHelpers;
};

const HomeScreen = ({ navigation }: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [page, setPage] = React.useState(1);
  const [isListEnd, setIsListEnd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuButton onPress={handlePressMenu} />
    });
  }, []);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await recipesApi.fetchRecipesRequest();
        setRecipes(response.data);
        setPage(2);
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
    };

    getAllRecipes();
  }, []);

  const handlePressMenu = useCallback(() => {
    navigation.openDrawer();
  }, []);

  const handleRefreshing = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await recipesApi.fetchRecipesRequest();
      setRecipes(response.data);
      setPage(2);
    } catch (error) {
      Alert.alert('Fetch data failed');
    }
    setRefreshing(false);
  }, []);

  const getRecipes = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      try {
        const response = await recipesApi.fetchRecipesRequest(page);
        if (response.data.length) {
          setPage(page + 1);
          setRecipes((prevState) => [...prevState, ...response.data]);
        } else {
          setIsListEnd(true);
        }
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
      setLoading(false);
    }
  };

  const handlePressRecipe = useCallback((item: Recipe) => {
    navigation.navigate(Screens.Recipe.name as 'Recipe', { item });
  }, []);

  const renderRecipes = ({ item }: { item: Recipe }) => (
    <RecipeCard item={item} onPressRecipe={handlePressRecipe} />
  );

  const renderKeyExtractor = (item: Recipe) => `${item.id}`;

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {loading ? <ActivityIndicator color="black" style={styles.indicator} /> : null}
      </View>
    );
  };

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
        ListFooterComponent={renderFooter}
        onEndReached={getRecipes}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default HomeScreen;
