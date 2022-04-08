import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, TouchableOpacity } from 'react-native';
import { BackArrow } from 'theme';
import styles from './styles';

type Props = {
  onPress: () => void;
};

const BackButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Image source={BackArrow} style={styles.btnIcon} />
    </TouchableOpacity>
  );
};

export default React.memo(BackButton, isEqual);
