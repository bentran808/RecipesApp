import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipesApi } from 'api';
import CategoryCard from 'components/CategoryCard';
import MenuButton from 'components/MenuButton';
import Screens from 'constants/Screens';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { transformCategories } from 'utils';

type CategoriesNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  navigation: CategoriesNavigationProp & DrawerNavigationHelpers;
};

const CategoriesScreen = ({ navigation }: Props) => {
  const [categories, setCategories] = React.useState<Category[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuButton onPress={handlePressMenu} />
    });
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await recipesApi.fetchCategoriesRequest();
        setCategories(transformCategories(response.data));
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
    };

    getAllCategories();
  }, []);

  const handlePressMenu = useCallback(() => {
    navigation.openDrawer();
  }, []);

  const handlePressCategory = useCallback((category: Category) => {
    navigation.navigate(Screens.RecipesList.name as 'RecipesList', { category });
  }, []);

  const renderCategories = ({ item }: { item: Category }) => (
    <CategoryCard item={item} onPressCategory={handlePressCategory} />
  );

  const renderKeyExtractor = (item: Category) => `${item.id}`;

  return (
    <View>
      <FlatList data={categories} renderItem={renderCategories} keyExtractor={renderKeyExtractor} />
    </View>
  );
};

export default CategoriesScreen;
