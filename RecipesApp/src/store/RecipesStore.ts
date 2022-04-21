import { recipesApi } from 'api';
import { toJS } from 'mobx';
import { flow, SnapshotOut, types } from 'mobx-state-tree';

export const RecipesEntry = types.model('RecipesEntry', {
  id: types.number,
  categoryId: types.number,
  title: types.string,
  photo_url: types.string,
  photosArray: types.array(types.string),
  time: types.string,
  ingredients: types.array(types.array(types.union(types.number, types.string))),
  description: types.string,
  category: types.model({
    id: types.number,
    name: types.string,
    photo_url: types.string
  })
});

export type RecipeModel = SnapshotOut<typeof RecipesEntry>;

const RecipesStore = types
  .model('RecipesStore', {
    items: types.optional(types.array(RecipesEntry), []),
    state: types.optional(types.enumeration('State', ['pending', 'done', 'error']), 'done')
  })
  .views((self) => ({
    get recipes() {
      return self.items;
    },
    get recipesJS() {
      return toJS(this.recipes);
    }
  }))
  .actions((self) => ({
    fetchRecipes: flow(function* fetchRecipes(page?: number) {
      self.state = 'pending';
      try {
        const response = yield recipesApi.fetchRecipesRequest(page);
        self.items = response.data;
        self.state = 'done';
      } catch (error) {
        self.state = 'error';
      }
    })
  }));

export default RecipesStore;
