import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageSourcePropType, Text, TouchableHighlight, View } from 'react-native';
import styles from './styles';

type Props = {
  title: string;
  onPress: () => void;
  source: ImageSourcePropType;
};

const MenuItem = ({ title, onPress, source }: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)"
    >
      <View style={styles.btnContainer}>
        <Image source={source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(MenuItem, isEqual);
