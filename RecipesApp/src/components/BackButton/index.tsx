import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import styles from './styles';

interface Props {
  source: ImageSourcePropType;
  onPress: () => void;
}

const BackButton = ({ source, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Image source={source} style={styles.btnIcon} />
    </TouchableOpacity>
  );
};

export default React.memo(BackButton, isEqual);
