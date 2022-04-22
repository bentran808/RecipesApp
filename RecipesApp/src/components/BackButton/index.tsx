import React from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  source: ImageSourcePropType;
  onPress: () => void;
  badge?: boolean;
  badgeCount?: number;
}

const BackButton = ({ source, onPress, badge = false, badgeCount = 0 }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Image source={source} style={styles.btnIcon} />
      {badge ? (
        <View style={styles.badge}>
          <Text style={{ fontSize: 10 }}>{badgeCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(BackButton, isEqual);
