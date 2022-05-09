import { recipesApi } from 'api';
import { toJS } from 'mobx';
import { flow, SnapshotOut, types } from 'mobx-state-tree';

export const IngredientsEntry = types.model('IngredientsEntry', {
  id: types.number,
  name: types.string,
  photo_url: types.string
});

export type IngredientModel = SnapshotOut<typeof IngredientsEntry>;

const IngredientsStore = types
  .model('IngredientsStore', {
    lists: types.optional(types.array(IngredientsEntry), []),
    state: types.optional(types.enumeration('State', ['pending', 'done', 'error']), 'done')
  })
  .views((self) => ({
    get ingredients() {
      return self.lists;
    },
    get ingredientsJS() {
      return toJS(this.ingredients);
    }
  }))
  .actions((self) => ({
    fetchIngredients: flow(function* fetchIngredients() {
      self.state = 'pending';
      try {
        const response = yield recipesApi.fetchIngredientsRequest();
        self.lists = response.data;
        self.state = 'done';
      } catch (error) {
        self.state = 'error';
      }
    })
  }));

export default IngredientsStore;
