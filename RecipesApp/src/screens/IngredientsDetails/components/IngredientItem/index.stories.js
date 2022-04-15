import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { ingredientsDetails } from 'mocks';
import React from 'react';
import CenterView from 'storybook/stories/CenterView';
import IngredientItem from '.';

storiesOf('Ingredient Item', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <IngredientItem item={ingredientsDetails} onPressIngredient={action('clicked-item')} />
  ));
