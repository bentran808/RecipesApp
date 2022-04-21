import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RecipeCard from 'components/RecipeCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { RecipeModel } from 'store/RecipesStore';
import styles from './styles';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: HomeNavigationProp & DrawerNavigationHelpers;
}

const HomeScreen = ({ navigation }: Props) => {
  const [page, setPage] = React.useState(1);
  const [isListEnd, setIsListEnd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { recipes } = useStore();

  useEffect(() => {
    recipes.fetchRecipes();
  }, []);

  const handleRefreshing = useCallback(async () => {
    recipes.fetchRecipes();
  }, []);

  const getRecipes = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      recipes.fetchRecipes(page);
      if (recipes.recipesJS.length) {
        setPage(page + 1);
      } else {
        setIsListEnd(true);
      }
      setLoading(false);
    }
  };

  const handlePressRecipe = useCallback((item: RecipeModel) => {
    navigation.navigate(Screens.Recipe.name as 'Recipe', { item });
  }, []);

  const renderRecipes = ({ item }: { item: RecipeModel }) => (
    <RecipeCard item={item} onPressRecipe={handlePressRecipe} />
  );

  const renderKeyExtractor = (item: RecipeModel) => `${item.id}`;

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
        refreshing={recipes.state === 'pending'}
        onRefresh={handleRefreshing}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes.recipesJS}
        renderItem={renderRecipes}
        keyExtractor={renderKeyExtractor}
        ListFooterComponent={renderFooter}
        onEndReached={getRecipes}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default observer(HomeScreen);
