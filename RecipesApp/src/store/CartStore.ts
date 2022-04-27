import { toJS } from 'mobx';
import { destroy, getRoot, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { RecipeModel, RecipesEntry } from 'store/RecipesStore';
import { RootStore } from 'store/store';

const CartEntry = types
  .model('CartEntry', {
    item: RecipesEntry,
    quantity: types.optional(types.number, 1),
    inCart: types.optional(types.boolean, true)
  })
  .actions((self) => ({
    remove() {
      getRoot<typeof RootStore>(self).cart.removeItem(self);
    },
    increase(quantity?: number) {
      self.quantity = quantity ? self.quantity + quantity : ++self.quantity;
    },
    decrease() {
      self.quantity === 1 ? this.remove() : --self.quantity;
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
    get recipesInCart() {
      return self.items.filter((item) => item.inCart);
    },
    get inCartCount() {
      return this.recipesInCart.length;
    },
    get total() {
      return this.recipesInCart.reduce((sum, item) => sum + item.quantity * 20, 0);
    }
  }))
  .actions((self) => ({
    addToCart(item: RecipeModel, quantity?: number) {
      const itemInCart = this.hasInCart(item);
      itemInCart ? itemInCart.increase(quantity) : self.items.push({ item, quantity });
    },
    removeItem(item: CartModel) {
      destroy(item);
    },
    hasInCart(recipe: RecipeModel) {
      return self.items.find((item) => item.item.id === recipe.id);
    }
  }));

export default CartStore;
