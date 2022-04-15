import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import { CloseIcon, SearchIcon } from 'theme';
import Input from '.';

const handleChangeText = action('item-changed');
const handlePressLeftIcon = action('clicked-left-icon');
const handlePressRightIcon = action('clicked-right-icon');
storiesOf('Input', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Input keyword="" onChangeText={handleChangeText} />)
  .add('with left icon', () => (
    <Input
      keyword=""
      onChangeText={handleChangeText}
      leftIcon={SearchIcon}
      onPressLeftIcon={handlePressLeftIcon}
    />
  ))
  .add('with right icon', () => (
    <Input
      keyword=""
      onChangeText={handleChangeText}
      rightIcon={CloseIcon}
      onPressRightIcon={handlePressRightIcon}
    />
  ))
  .add('with left and right icon', () => (
    <Input
      keyword=""
      onChangeText={handleChangeText}
      leftIcon={SearchIcon}
      onPressLeftIcon={handlePressLeftIcon}
      rightIcon={CloseIcon}
      onPressRightIcon={handlePressRightIcon}
    />
  ));
