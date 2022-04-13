import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, TouchableOpacity } from 'react-native';
import { MenuIcon } from 'theme';
import styles from './styles';

interface Props {
  onPress: () => void;
}

const MenuButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
      <Image style={styles.headerButtonImage} source={MenuIcon} />
    </TouchableOpacity>
  );
};

export default React.memo(MenuButton, isEqual);
