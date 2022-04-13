import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import Screens from 'constants/Screens';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
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
  const [ingredientsDetails, setIngredientsDetails] = React.useState<IngredientsDetails[]>();
  const { title, ingredients } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title
    });
  }, []);

  useEffect(() => {
    const getAllIngredients = async () => {
      try {
        const response = await recipesApi.fetchIngredientsRequest();
        setIngredientsDetails(mappingIngredientsDetails(ingredients, response.data));
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
    };

    getAllIngredients();
  }, []);

  const handlePressIngredient = useCallback(
    (item: IngredientsDetails) => () => {
      navigation.navigate(Screens.Ingredient.name as 'Ingredient', { ingredient: item[0] });
    },
    []
  );
  const renderIngredient = ({ item }: { item: IngredientsDetails }) => (
    <IngredientItem item={item} onPressIngredient={handlePressIngredient(item)} />
  );

  const renderKeyExtractor = (item: IngredientsDetails) => `${item[0].id}`;

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={ingredientsDetails}
        renderItem={renderIngredient}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default IngredientsDetailsScreen;
