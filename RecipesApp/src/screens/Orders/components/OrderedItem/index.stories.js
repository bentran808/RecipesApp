import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import OrderedItem from '.';

storiesOf('Ordered Item', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <OrderedItem
      item={{
        items: [
          {
            name: 'Oatmeal Cookies',
            quantity: 1
          },
          {
            name: 'Triple Berry Smoothie',
            quantity: 2
          }
        ],
        total: 65,
        createdAt: '06 May 2022, 4:30PM'
      }}
    />
  ));
