import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { BackArrow, MenuIcon } from 'theme';
import BackButton from '.';
import CenterView from 'storybook/stories/CenterView';

storiesOf('Back Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('with back icon', () => <BackButton source={BackArrow} onPress={action('clicked-icon')} />)
  .add('with menu icon', () => <BackButton source={MenuIcon} onPress={action('clicked-icon')} />);
