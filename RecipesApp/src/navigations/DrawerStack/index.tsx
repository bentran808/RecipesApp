import { createDrawerNavigator } from "@react-navigation/drawer";
import Screens from "constants/Screens";
import MainNavigator from "navigations/MainNavigator";
import DrawerContainer from "screens/DrawerContainer";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return(
    <Drawer.Navigator
      initialRouteName={Screens.Main.name}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: 250
        }
      }}
      drawerContent={({navigation}) => <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name={Screens.Main.name} component={MainNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerStack;