import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { recipe } from 'mocks';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import RecipeCard from '.';

storiesOf('Recipe Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <RecipeCard
      item={recipe}
      onPressRecipe={action('clicked-card')}
      onPressCart={action('clicked-cart-icon')}
    />
  ));
