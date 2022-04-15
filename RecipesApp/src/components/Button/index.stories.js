import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import Button from '.';

const handlePress = action('clicked-button');
storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Button testID="testID" title="Hello Button" onPress={handlePress} />)
  .add('bold text', () => (
    <Button testID="testID" title="Hello Button" bold onPress={handlePress} />
  ))
  .add('type outlined', () => (
    <Button testID="testID" title="Hello Button" type="outlined" onPress={handlePress} />
  ))
  .add('type contained', () => (
    <Button testID="testID" title="Hello Button" type="contained" onPress={handlePress} />
  ));
