import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BackButton from 'components/BackButton';
import MenuButton from 'components/MenuButton';
import Screens from 'constants/Screens';
import AddressScreen from 'screens/Address';
import CartScreen from 'screens/Cart';
import CategoriesScreen from 'screens/Categories';
import CheckoutScreen from 'screens/Checkout';
import HomeScreen from 'screens/Home';
import IngredientScreen from 'screens/Ingredient';
import IngredientsDetailsScreen from 'screens/IngredientsDetails';
import OrdersScreen from 'screens/Orders';
import RecipeScreen from 'screens/Recipe';
import RecipesListScreen from 'screens/RecipesList';
import SearchScreen from 'screens/Search';
import { BackArrow } from 'theme';

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
            headerLeft: () => <BackButton source={BackArrow} onPress={handlePressBack} />
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
      <Stack.Screen
        name={Screens.Checkout.name}
        component={CheckoutScreen}
        options={{
          title: Screens.Checkout.label
        }}
      />
      <Stack.Screen
        name={Screens.Address.name}
        component={AddressScreen}
        options={({ navigation }) => {
          const handlePressMenu = () => {
            navigation.openDrawer();
          };

          return {
            title: Screens.Address.label,
            headerLeft: () => <MenuButton onPress={handlePressMenu} />
          };
        }}
      />
      <Stack.Screen
        name={Screens.Orders.name}
        component={OrdersScreen}
        options={({ navigation }) => {
          const handlePressMenu = () => {
            navigation.openDrawer();
          };

          return {
            title: Screens.Orders.label,
            headerLeft: () => <MenuButton onPress={handlePressMenu} />
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
