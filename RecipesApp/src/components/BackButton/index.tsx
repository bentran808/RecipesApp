import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { BackArrow } from 'theme';

import styles from './styles';

type Props = {
  onPress: () => void;
};

const BackButton = ({ onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.btnContainer}>
      <Image source={BackArrow} style={styles.btnIcon} />
    </TouchableHighlight>
  );
};

export default React.memo(BackButton);
