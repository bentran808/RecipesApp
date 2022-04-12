import React, { useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageSourcePropType, Pressable, TextInput, View } from 'react-native';
import styles from './styles';

type Props = {
  keyword: string;
  onChangeText: (text: string) => void;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
};

const Input = ({
  keyword,
  onChangeText,
  leftIcon,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon
}: Props) => {
  const handlePressLeftIcon = useCallback(() => {
    onPressLeftIcon && onPressLeftIcon();
  }, []);

  const handlePressRightIcon = useCallback(() => {
    onPressRightIcon && onPressRightIcon();
  }, []);

  return (
    <View style={styles.searchContainer}>
      {leftIcon && (
        <Pressable testID='leftIcon' onPress={handlePressLeftIcon}>
          <Image style={styles.searchIcon} source={leftIcon} />
        </Pressable>
      )}
      <TextInput style={styles.searchInput} onChangeText={onChangeText} value={keyword} />
      {rightIcon && (
        <Pressable testID='rightIcon' onPress={handlePressRightIcon}>
          <Image style={styles.searchIcon} source={rightIcon} />
        </Pressable>
      )}
    </View>
  );
};

export default React.memo(Input, isEqual);
