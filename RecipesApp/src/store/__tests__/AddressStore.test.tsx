import { AddressEntry } from 'store/AddressStore';
import { RootStore } from 'store/store';

describe('Address Store', () => {
  const appStore = RootStore.create({
    categories: {},
    recipes: {},
    ingredients: {},
    cart: {},
    address: {
      items: [
        {
          address: '448 TNV',
          id: 0,
          type: 'Home'
        }
      ]
    }
  });

  test('Can create an instance of a address entry', () => {
    const address = AddressEntry.create({
      address: '448 TNV',
      id: 0,
      type: 'Home'
    });
    address.edit('Work', '604 NT');
    expect(address).toEqual({ address: '604 NT', id: 0, type: 'Work' });
  });

  test('should call function setAddress', () => {
    appStore.address.setAddress('test');
    expect(appStore.address.address).toEqual('test');
  });

  test('should call function addNewItem', () => {
    appStore.address.addNewItem('Work', '604 NT');
    expect(appStore.address.addresses).toEqual([
      {
        address: '448 TNV',
        id: 0,
        type: 'Home'
      },
      {
        address: '604 NT',
        id: 1,
        type: 'Work'
      }
    ]);
  });

  test('should call function existAddress', () => {
    const result = appStore.address.existAddress({
      address: '448 TNV',
      id: 0,
      type: 'Home'
    });
    expect(result).toBeTruthy();
  });

  test('should call function setItemUsing', () => {
    appStore.address.setItemUsing({
      address: '448 TNV',
      id: 0,
      type: 'Home'
    });
    expect(appStore.address.itemUsing).toEqual({
      address: '448 TNV',
      id: 0,
      type: 'Home'
    });
  });
});
