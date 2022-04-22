import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { MenuIcon } from 'theme';
import styles from './styles';

interface Props {
  source?: ImageSourcePropType;
  onPress: () => void;
  badge?: boolean;
  badgeCount?: number;
}

const MenuButton = ({ source = MenuIcon, onPress, badge = false, badgeCount = 0 }: Props) => {
  return (
    <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
      <Image style={styles.headerButtonImage} source={source} />
      {badge ? (
        <View style={styles.badge}>
          <Text style={{ fontSize: 10 }}>{badgeCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(MenuButton, isEqual);
