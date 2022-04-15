import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { category } from 'mocks';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import CategoryCard from '.';

storiesOf('Category Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <CategoryCard item={category} onPressCategory={action('clicked-card')} />);
