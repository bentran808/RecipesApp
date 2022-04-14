import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BackButton from 'components/BackButton';
import MenuButton from 'components/MenuButton';
import Screens from 'constants/Screens';
import CategoriesScreen from 'screens/Categories';
import HomeScreen from 'screens/Home';
import IngredientScreen from 'screens/Ingredient';
import IngredientsDetailsScreen from 'screens/IngredientsDetails';
import RecipeScreen from 'screens/Recipe';
import RecipesListScreen from 'screens/RecipesList';
import SearchScreen from 'screens/Search';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name={Screens.Home.name}
        component={HomeScreen}
        options={({ navigation }) => {
          const handlePressMenu = () => {
            navigation.openDrawer();
          };

          return {
            headerLeft: () => <MenuButton onPress={handlePressMenu} />
          };
        }}
      />
      <Stack.Screen
        name={Screens.Categories.name}
        component={CategoriesScreen}
        options={({ navigation }) => {
          const handlePressMenu = () => {
            navigation.openDrawer();
          };

          return {
            headerLeft: () => <MenuButton onPress={handlePressMenu} />
          };
        }}
      />
      <Stack.Screen
        name={Screens.Recipe.name}
        component={RecipeScreen}
        options={({ navigation }) => {
          const handlePressBack = () => {
            navigation.goBack();
          };

          return {
            headerTransparent: true,
            headerLeft: () => <BackButton onPress={handlePressBack} />
          };
        }}
      />
      <Stack.Screen name={Screens.RecipesList.name} component={RecipesListScreen} />
      <Stack.Screen name={Screens.Ingredient.name} component={IngredientScreen} />
      <Stack.Screen
        name={Screens.IngredientsDetails.name}
        component={IngredientsDetailsScreen}
        options={{
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold'
          }
        }}
      />
      <Stack.Screen
        name={Screens.Search.name}
        component={SearchScreen}
        options={({ navigation }) => {
          const handlePressMenu = () => {
            navigation.openDrawer();
          };

          return {
            headerBackVisible: false,
            headerLeft: () => <MenuButton onPress={handlePressMenu} />
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
