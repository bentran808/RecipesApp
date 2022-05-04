import { recipesApi } from 'api';
import { toJS } from 'mobx';
import { flow, SnapshotOut, types } from 'mobx-state-tree';
import { transformCategories } from 'utils';
import { RecipesEntry } from './RecipesStore';

export const CategoriesEntry = types.model('CategoriesEntry', {
  id: types.number,
  name: types.string,
  photo_url: types.string,
  recipes: types.maybe(types.array(RecipesEntry))
});

export type CategoryModel = SnapshotOut<typeof CategoriesEntry>;

const CategoriesStore = types
  .model('CategoriesStore', {
    lists: types.optional(types.array(CategoriesEntry), []),
    state: types.optional(types.enumeration('State', ['pending', 'done', 'error']), 'done')
  })
  .views((self) => ({
    get categories() {
      return self.lists;
    },
    get categoriesJS() {
      return transformCategories(toJS(this.categories));
    }
  }))
  .actions((self) => ({
    fetchCategories: flow(function* fetchCategories() {
      self.state = 'pending';
      try {
        const response = yield recipesApi.fetchCategoriesRequest();
        self.lists = response.data;
        self.state = 'done';
      } catch (error) {
        console.log(error);
        self.state = 'error';
      }
    })
  }));

export default CategoriesStore;
