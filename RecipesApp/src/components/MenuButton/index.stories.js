import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import MenuButton from '.';

storiesOf('Menu Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <MenuButton onPress={action('clicked-icon')} />);
