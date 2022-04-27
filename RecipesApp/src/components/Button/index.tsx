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
  style?: any;
  disabled?: boolean;
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
  bold = false,
  style,
  disabled = false
}: Props) => {
  const fontWeight = bold ? 'bold' : 'normal';
  let textColor = disabled ? 'gray' : color;
  let additionalStyles;

  switch (type) {
    case 'outlined':
      additionalStyles = {
        borderWidth: 1,
        borderColor,
        paddingVertical,
        paddingHorizontal
      };
      break;
    case 'contained':
      additionalStyles = {
        backgroundColor: disabled ? 'gray' : color,
        paddingVertical,
        paddingHorizontal
      };
      textColor = 'white';
      break;

    default:
      additionalStyles = {};
      break;
  }

  return (
    <TouchableOpacity disabled={disabled} testID={testID} onPress={onPress}>
      <View style={[styles.btn, additionalStyles, style]}>
        <Text style={[{ fontSize, color: textColor, fontWeight, textAlign: 'center' }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Button, isEqual);
