import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center',
          contentStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center'
          }
      }}
    >
      <Stack.Screen name={Screens.Home.name} component={HomeScreen} />
      <Stack.Screen name={Screens.Categories.name} component={CategoriesScreen}/>
      <Stack.Screen name={Screens.Recipe.name} component={RecipeScreen}/>
      <Stack.Screen name={Screens.RecipesList.name} component={RecipesListScreen} />
      <Stack.Screen name={Screens.Ingredient.name} component={IngredientScreen} />
      <Stack.Screen name={Screens.IngredientsDetails.name} component={IngredientsDetailsScreen} />
      <Stack.Screen name={Screens.Search.name} component={SearchScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator;