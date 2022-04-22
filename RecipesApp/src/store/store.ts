import { Instance, types } from 'mobx-state-tree';
import CartStore from 'store/CartStore';
import IngredientsStore from 'store/IngredientsStore';
import RecipesStore from 'store/RecipesStore';
import CategoriesStore from './CategoriesStore';

const RootStore = types.model('RootStore', {
  categories: CategoriesStore,
  recipes: RecipesStore,
  ingredients: IngredientsStore,
  cart: CartStore
});

const store = RootStore.create({
    categories: {},
    recipes: {},
    ingredients: {},
    cart: {}
});

export type RootStoreModel = Instance<typeof RootStore>;

export default store;
