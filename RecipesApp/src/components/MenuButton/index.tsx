import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { MenuIcon } from 'theme';
import styles from './styles';

type Props = {
    onPress: () => void
}

const MenuButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
      <Image style={styles.headerButtonImage} source={MenuIcon} />
    </TouchableOpacity>
  )
}

export default React.memo(MenuButton);