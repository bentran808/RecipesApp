import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from 'navigations/DrawerStack';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}
