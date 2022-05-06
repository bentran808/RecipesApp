import { storiesOf } from '@storybook/react-native';
import { recipe } from 'mocks';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import CartItem from '.';

storiesOf('Cart Item', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <CartItem
      item={{
        item: recipe,
        quantity: 1,
        inCart: true
      }}
    />
  ));
