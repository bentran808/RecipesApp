import { toJS } from 'mobx';
import { applySnapshot, destroy, getRoot, SnapshotOut, types } from 'mobx-state-tree';
import { RecipeModel, RecipesEntry } from 'store/RecipesStore';
import { RootStore } from 'store/store';

export const CartEntry = types
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

const BillEntry = types.model('BillEntry', {
  type: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  code: types.optional(types.string, ''),
  price: types.optional(types.number, 0)
});

const OrderedEntry = types.model('OrderedEntry', {
  items: types.array(
    types.model({
      name: types.optional(types.string, ''),
      quantity: types.optional(types.number, 0)
    })
  ),
  total: types.number,
  createdAt: types.string
});

export type CartModel = SnapshotOut<typeof CartEntry>;
export type BillModel = SnapshotOut<typeof BillEntry>;
export type OrderedModel = SnapshotOut<typeof OrderedEntry>;

const CartStore = types
  .model('CartStore', {
    items: types.array(CartEntry),
    billItems: types.array(BillEntry),
    orderedItems: types.array(OrderedEntry)
  })
  .views((self) => ({
    get recipes() {
      return toJS(self.items);
    },
    get recipesInCart() {
      return this.recipes.filter((item) => item.inCart);
    },
    get inCartCount() {
      return this.recipesInCart.length;
    },
    get total() {
      return this.recipesInCart.reduce((sum, item) => sum + item.quantity * 20, 0);
    },
    get billDetails() {
      return toJS(self.billItems);
    },
    get toPay() {
      return this.billDetails.reduce(
        (sum, item) => (item.type === 'discount' ? sum - item.price : sum + item.price),
        0
      );
    },
    get orderedList() {
      return toJS(self.orderedItems);
    }
  }))
  .volatile(() => ({
    discountInput: '',
    invalidCoupon: false
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
    },
    setDiscountInput(text: string) {
      if (!text) {
        self.invalidCoupon = false;
      }
      self.discountInput = text;
    },
    applyCoupon(item: BillModel) {
      const existItem = self.billItems.findIndex((bill) => bill.type === 'discount');
      if (existItem > -1) {
        self.billItems.splice(existItem, 1, item);
      } else {
        self.billItems.push(item);
      }
    },
    payment(order: OrderedModel) {
      self.orderedItems.unshift(order);
      applySnapshot(self, {
        ...self,
        items: [],
        billItems: []
      });
    },
    isInvalidCoupon(status: boolean) {
      self.invalidCoupon = status;
    }
  }));

export default CartStore;
