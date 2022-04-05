import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import MenuItem from 'components/MenuItem';
import Screens from 'constants/Screens';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { CategoryIcon, HomeIcon, SearchIcon } from 'theme';
import styles from './styles';

type Props = {
  navigation: DrawerNavigationHelpers;
};

const DrawerContainer = ({ navigation }: Props) => {
  const handleNavigateHome = useCallback(() => {
    navigation.navigate(Screens.Home.name);
    navigation.closeDrawer();
  }, []);

  const handleNavigateCategories = useCallback(() => {
    navigation.navigate(Screens.Categories.name);
    navigation.closeDrawer();
  }, []);

  const handleNavigateSearch = useCallback(() => {
    navigation.navigate(Screens.Search.name);
    navigation.closeDrawer();
  }, []);

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuItem title={Screens.Home.label} source={HomeIcon} onPress={handleNavigateHome} />
        <MenuItem
          title={Screens.Categories.label}
          source={CategoryIcon}
          onPress={handleNavigateCategories}
        />
        <MenuItem title={Screens.Search.label} source={SearchIcon} onPress={handleNavigateSearch} />
      </View>
    </View>
  );
};

export default DrawerContainer;
