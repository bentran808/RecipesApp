import { cartItem, recipe } from 'mocks';
import { CartEntry } from 'store/CartStore';
import { RootStore } from 'store/store';

describe('Cart Store', () => {
  describe('Can create an instance of a cart entry', () => {
    const cart = CartEntry.create({
      item: recipe,
      quantity: 1,
      inCart: true
    });

    test('should call function increase', () => {
      cart.increase();
      expect(cart.quantity).toEqual(2);
    });

    test('should call function increase with param', () => {
      cart.increase(2);
      expect(cart.quantity).toEqual(4);
    });

    test('should call function decrease', () => {
      cart.decrease();
      expect(cart.quantity).toEqual(3);
    });

    test('should call function toggle', () => {
      cart.toggle();
      expect(cart.inCart).toBeFalsy();
    });
  });

  describe('Can create an instance of a store', () => {
    const appStore = RootStore.create({
      categories: {},
      recipes: {},
      ingredients: {},
      cart: {
        billItems: [
          {
            type: 'total',
            name: 'Item Total',
            code: 'TOTAL',
            price: 20
          },
          {
            type: 'fee',
            name: 'Delivery Fee',
            code: 'DELIVER',
            price: 5
          }
        ]
      },
      address: {}
    });

    test('should call function addToCart', () => {
      appStore.cart.addToCart(recipe, 1);
      expect(appStore.cart.recipes).toEqual([cartItem]);

      appStore.cart.addToCart(recipe, 2);
      expect(appStore.cart.total).toEqual(60);
      expect(appStore.cart.inCartCount).toEqual(1);
    });

    test('should call function setDiscountInput', () => {
      appStore.cart.setDiscountInput('test');
      expect(appStore.cart.discountInput).toEqual('test');
    });

    test('should call function applyCoupon', () => {
      appStore.cart.applyCoupon({
        code: 'FREESHIP',
        name: 'Free Ship',
        price: 5,
        type: 'discount'
      });
      expect(appStore.cart.billDetails).toEqual([
        {
          type: 'total',
          name: 'Item Total',
          code: 'TOTAL',
          price: 20
        },
        {
          type: 'fee',
          name: 'Delivery Fee',
          code: 'DELIVER',
          price: 5
        },
        {
          code: 'FREESHIP',
          name: 'Free Ship',
          price: 5,
          type: 'discount'
        }
      ]);

      appStore.cart.applyCoupon({
        code: 'GET10OFF',
        name: 'Offer 10% OFF',
        price: 2,
        type: 'discount'
      });
      expect(appStore.cart.toPay).toEqual(23);
    });

    test('should call function payment', () => {
      appStore.cart.payment({
        items: [
          {
            name: 'test',
            quantity: 1
          }
        ],
        total: 20,
        createdAt: ''
      });

      expect(appStore.cart.orderedList).toEqual([
        {
          items: [
            {
              name: 'test',
              quantity: 1
            }
          ],
          total: 20,
          createdAt: ''
        }
      ]);
    });
  });
});
