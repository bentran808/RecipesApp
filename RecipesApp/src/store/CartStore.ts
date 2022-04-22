import { toJS } from 'mobx';
import { destroy, getRoot, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { RecipeModel, RecipesEntry } from 'store/RecipesStore';

const CartEntry = types
  .model('CartEntry', {
    item: RecipesEntry,
    quantity: types.optional(types.number, 1),
    inCart: types.optional(types.boolean, true)
  })
  .actions((self) => ({
    remove() {
      console.log(getRoot(self));
    },
    increase() {
      self.quantity++;
    },
    decrease() {
      self.quantity--;
    },
    toggle() {
      self.inCart = !self.inCart;
    }
  }));

export type CartInstance = Instance<typeof CartEntry>;
export type CartModel = SnapshotOut<typeof CartEntry>;

const CartStore = types
  .model('CartStore', {
    items: types.array(CartEntry)
  })
  .views((self) => ({
    get recipes() {
      return toJS(self.items);
    },
    get inCartCount() {
      return self.items.filter((item) => item.inCart).length;
    }
  }))
  .actions((self) => ({
    addToCart(item: RecipeModel) {
      self.items.push({ item });
    },
    removeItem(item: RecipeModel) {
      destroy(item);
    }
  }));

export default CartStore;
