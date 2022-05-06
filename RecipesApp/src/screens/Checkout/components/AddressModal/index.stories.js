import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { address } from 'mocks';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import AddressModal from '.';

storiesOf('Address Modal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <AddressModal
      navigation={{
        navigate: action('navigate')
      }}
      data={address}
      modalVisible={true}
      onToggleModal={action('toggle-modal')}
      renderSeparator={() => null}
    />
  ));
