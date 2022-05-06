import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { address } from 'mocks';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import { HomeIcon } from 'theme';
import AddressCard from '.';

storiesOf('Address Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <AddressCard
      item={address[0]}
      source={HomeIcon}
      onPressEdit={action('clicked-edit')}
      onPressDelete={action('clicked-delete')}
    />
  ));
