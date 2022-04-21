import { Instance, types } from 'mobx-state-tree';
import RecipesStore from 'store/RecipesStore';
import CategoriesStore from './CategoriesStore';

const RootStore = types.model('RootStore', {
  categories: CategoriesStore,
  recipes: RecipesStore
});

const store = RootStore.create({
    categories: {},
    recipes: {}
});

export type RootStoreModel = Instance<typeof RootStore>;

export default store;
