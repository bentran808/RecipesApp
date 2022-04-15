import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import CenterView from 'storybook/stories/CenterView';
import { HomeIcon } from 'theme';
import MenuItem from '.';

storiesOf('Menu Item', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <MenuItem title="Hello Menu Item" source={HomeIcon} onPress={action('clicked-item')} />
  ));
