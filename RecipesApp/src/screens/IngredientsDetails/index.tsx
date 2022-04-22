import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import IngredientItem from 'screens/IngredientsDetails/components/IngredientItem';
import { mappingIngredientsDetails } from 'utils';

type IngredientsDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: IngredientsDetailsNavigationProp;
  route: {
    params: {
      title: string;
      ingredients: (number | string)[][];
    };
  };
}

const IngredientsDetailsScreen = ({ navigation, route }: Props) => {
  const { title, ingredients } = route.params;
  const { ingredients: lists } = useStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      title
    });
  }, [title]);

  useEffect(() => {
    if (!lists.ingredientsJS.length) {
      lists.fetchIngredients();
    }
  }, []);

  const handlePressIngredient = useCallback((item: IngredientsDetails) => {
    navigation.navigate(Screens.Ingredient.name as 'Ingredient', { ingredient: item[0] });
  }, []);

  const renderIngredient = ({ item }: { item: IngredientsDetails }) => (
    <IngredientItem item={item} onPressIngredient={handlePressIngredient} />
  );

  const renderKeyExtractor = (item: IngredientsDetails) => `${item[0].id}`;

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={mappingIngredientsDetails(ingredients, lists.ingredientsJS)}
        renderItem={renderIngredient}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default observer(IngredientsDetailsScreen);
