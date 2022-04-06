import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from './styles';

type Props = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: Props) => {
  return (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(Button);
