import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  testID: string;
  title: string;
  onPress: () => void;
  borderColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  textColor?: string;
}

const Button = ({
  testID,
  title,
  onPress,
  borderColor = '#2cd18a',
  paddingVertical = 10,
  paddingHorizontal = 60,
  fontSize = 14,
  textColor = '#2cd18a'
}: Props) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <View style={[styles.container, { borderColor, paddingVertical, paddingHorizontal }]}>
        <Text style={{ fontSize, color: textColor }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Button, isEqual);
