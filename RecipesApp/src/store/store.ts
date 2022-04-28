import { Instance, types } from 'mobx-state-tree';
import AddressStore from './AddressStore';
import CartStore from './CartStore';
import CategoriesStore from './CategoriesStore';
import IngredientsStore from './IngredientsStore';
import RecipesStore from './RecipesStore';

export const RootStore = types.model('RootStore', {
  categories: CategoriesStore,
  recipes: RecipesStore,
  ingredients: IngredientsStore,
  cart: CartStore,
  address: AddressStore
});

const store = RootStore.create({
  categories: {},
  recipes: {},
  ingredients: {},
  cart: {},
  address: {}
});

export type RootStoreModel = Instance<typeof RootStore>;

export default store;
