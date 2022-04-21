import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BackButton from 'components/BackButton';
import MenuButton from 'components/MenuButton';
import Screens from 'constants/Screens';
import CartScreen from 'screens/Cart';
import CategoriesScreen from 'screens/Categories';
import HomeScreen from 'screens/Home';
import IngredientScreen from 'screens/Ingredient';
import IngredientsDetailsScreen from 'screens/IngredientsDetails';
import RecipeScreen from 'screens/Recipe';
import RecipesListScreen from 'screens/RecipesList';
import SearchScreen from 'screens/Search';
import { BackArrow, BasketIcon } from 'theme';

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
          const handlePressCart = () => {
            navigation.navigate(Screens.Cart.name);
          };

          return {
            headerLeft: () => <MenuButton onPress={handlePressMenu} />,
            headerRight: () => <MenuButton source={BasketIcon} onPress={handlePressCart} badge />
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
          const handlePressCart = () => {
            navigation.navigate(Screens.Cart.name);
          };

          return {
            headerTransparent: true,
            headerLeft: () => <BackButton source={BackArrow} onPress={handlePressBack} />,
            headerRight: () => <BackButton source={BasketIcon} onPress={handlePressCart} />
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
      <Stack.Screen name={Screens.Cart.name} component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
