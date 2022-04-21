import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from 'context';
import DrawerStack from 'navigations/DrawerStack';
import 'react-native-gesture-handler';
import store from 'store/store';

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider value={store}>
        <DrawerStack />
      </StoreProvider>
    </NavigationContainer>
  );
}

// Watch storybooks on the emulator
// export { default } from './src/storybook';
