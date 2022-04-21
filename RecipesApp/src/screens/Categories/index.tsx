import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CategoryCard from 'components/CategoryCard';
import Screens from 'constants/Screens';
import { useStore } from 'context';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { CategoryModel } from 'store/CategoriesStore';

type CategoriesNavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  navigation: CategoriesNavigationProp & DrawerNavigationHelpers;
}

const CategoriesScreen = ({ navigation }: Props) => {
  // const [categories, setCategories] = React.useState<Category[]>();
  const { categories } = useStore();
  console.log('categories', categories);
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        // const response = await recipesApi.fetchCategoriesRequest();
        // setCategories(transformCategories(response.data));
        categories.fetchCategories();
      } catch (error) {
        Alert.alert('Fetch data failed');
      }
    };
    categories.fetchCategories();
    getAllCategories();
  }, []);

  const handlePressCategory = useCallback((category: CategoryModel) => {
    navigation.navigate(Screens.RecipesList.name as 'RecipesList', { category });
  }, []);

  const renderCategories = ({ item }: { item: CategoryModel }) => (
    <CategoryCard item={item} onPressCategory={handlePressCategory} />
  );

  const renderKeyExtractor = (item: CategoryModel) => `${item.id}`;

  return (
    <View>
      <FlatList
        data={categories.categoriesJS}
        renderItem={renderCategories}
        keyExtractor={renderKeyExtractor}
      />
    </View>
  );
};

export default observer(CategoriesScreen);
