import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  testID: string;
  title: string;
  onPress: () => void;
  type?: string;
  borderColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  color?: string;
  bold?: boolean;
}

const Button = ({
  testID,
  title,
  onPress,
  type = 'text', // 'text' | 'outlined' | 'contained'
  borderColor = '#2cd18a',
  paddingVertical = 10,
  paddingHorizontal = 60,
  fontSize = 14,
  color = '#2cd18a',
  bold = false
}: Props) => {
  const textColor = type === 'contained' ? 'white' : color;
  const fontWeight = bold ? 'bold' : 'normal';
  let additionalStyles;

  switch (type) {
    case 'outlined':
      additionalStyles = {
        borderWidth: 1,
        borderColor,
        paddingVertical,
        paddingHorizontal,
        marginTop: 20
      };
      break;
    case 'contained':
      additionalStyles = {
        backgroundColor: color,
        paddingVertical,
        paddingHorizontal
      };
      break;

    default:
      additionalStyles = {};
      break;
  }

  return (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <View style={[styles.btn, additionalStyles]}>
        <Text style={[{ fontSize, color: textColor, fontWeight }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Button, isEqual);
