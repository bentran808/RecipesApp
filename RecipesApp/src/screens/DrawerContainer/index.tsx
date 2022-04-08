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
  const handlePressHome = useCallback(() => {
    navigation.navigate(Screens.Home.name);
    navigation.closeDrawer();
  }, []);

  const handlePressCategories = useCallback(() => {
    navigation.navigate(Screens.Categories.name);
    navigation.closeDrawer();
  }, []);

  const handlePressSearch = useCallback(() => {
    navigation.navigate(Screens.Search.name);
    navigation.closeDrawer();
  }, []);

  const drawerList = [
    {
      title: Screens.Home.label,
      source: HomeIcon,
      onPress: handlePressHome
    },
    {
      title: Screens.Categories.label,
      source: CategoryIcon,
      onPress: handlePressCategories
    },
    {
      title: Screens.Search.label,
      source: SearchIcon,
      onPress: handlePressSearch
    }
  ];

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        {drawerList.map(({ title, source, onPress }, index) => (
          <MenuItem key={index} title={title} source={source} onPress={onPress} />
        ))}
      </View>
    </View>
  );
};

export default DrawerContainer;
