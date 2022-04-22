import { recipesApi } from 'api';
import { toJS } from 'mobx';
import { applySnapshot, flow, SnapshotOut, types } from 'mobx-state-tree';
import { CategoryModel } from 'store/CategoriesStore';

export const RecipesEntry = types.model('RecipesEntry', {
  id: types.number,
  categoryId: types.number,
  title: types.string,
  photo_url: types.string,
  photosArray: types.array(types.string),
  time: types.string,
  ingredients: types.array(types.array(types.union(types.number, types.string))),
  description: types.string,
  category: types.maybe(
    types.model({
      id: types.number,
      name: types.string,
      photo_url: types.string
    })
  )
});

export type RecipeModel = SnapshotOut<typeof RecipesEntry>;

const RecipesStore = types
  .model('RecipesStore', {
    items: types.optional(types.array(RecipesEntry), []),
    state: types.optional(types.enumeration('State', ['pending', 'done', 'error']), 'done'),
    currentPage: types.optional(types.number, 1),
    isEndList: types.optional(types.boolean, false),
    itemsOfCategory: types.optional(types.array(RecipesEntry), []),
    resultsOfSearch: types.optional(types.array(RecipesEntry), [])
  })
  .views((self) => ({
    get recipes() {
      return self.items;
    },
    get recipesJS() {
      return toJS(this.recipes);
    },
    get recipesOfCategoryJS() {
      return toJS(self.itemsOfCategory);
    },
    get recipesResultsJS() {
      return toJS(self.resultsOfSearch);
    }
  }))
  .volatile(() => ({
    keyword: ''
  }))
  .actions((self) => ({
    fetchRecipes: flow(function* fetchRecipes(page?: number) {
      if (!self.isEndList) {
        self.state = 'pending';
        try {
          const response = yield recipesApi.fetchRecipesRequest(page);
          if (response.data.length) {
            self.currentPage++;
            applySnapshot(self, {
              ...self,
              items: !page || page === 1 ? response.data : [...self.items, ...response.data]
            });
          } else {
            self.isEndList = true;
          }
          self.state = 'done';
        } catch (error) {
          console.log(error);
          self.state = 'error';
        }
      }
    }),
    fetchRecipesByCategoryId: flow(function* fetchRecipesByCategoryId(id: number) {
      self.state = 'pending';
      try {
        const response = yield recipesApi.fetchRecipesByCategoryIdRequest(id);
        self.itemsOfCategory = response.data;
        self.state = 'done';
      } catch (error) {
        console.log(error);
        self.state = 'error';
      }
    }),
    searchRecipeName: flow(function* searchRecipeName(text: string) {
      self.state = 'pending';
      try {
        const response = yield recipesApi.searchByRecipeNameRequest(text);

        applySnapshot(self, {
          ...self,
          resultsOfSearch: [...self.resultsOfSearch, ...response.data]
        });
        self.state = 'done';
      } catch (error) {
        console.log(error);
        self.state = 'error';
      }
    }),
    searchCategoryName: flow(function* searchCategoryName(text: string) {
      self.state = 'pending';
      try {
        const response = yield recipesApi.searchByCategoryNameRequest(text);
        const recipesOfCategory = (response.data || [])
          .map((category: CategoryModel) =>
            (category.recipes || []).map((recipe) => ({
              ...recipe,
              category: {
                id: category.id,
                name: category.name,
                photo_url: category.photo_url
              }
            }))
          )
          .flat(1);

        applySnapshot(self, {
          ...self,
          resultsOfSearch: [...self.resultsOfSearch, ...recipesOfCategory]
        });
        self.state = 'done';
      } catch (error) {
        console.log(error);
        self.state = 'error';
      }
    }),
    setKeyword(text: string) {
      self.keyword = text;
    },
    setEmptyRecipes() {
      applySnapshot(self, {
        ...self,
        resultsOfSearch: []
      });
    }
  }));

export default RecipesStore;
