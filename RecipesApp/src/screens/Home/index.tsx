import MenuButton from 'components/MenuButton';
import React, { useLayoutEffect } from 'react'
import { Text, View } from 'react-native';

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuButton
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )
    });
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen;