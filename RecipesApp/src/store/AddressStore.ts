import { toJS } from 'mobx';
import { types, destroy, SnapshotOut, getRoot, applySnapshot } from 'mobx-state-tree';
import { RootStore } from 'store/store';

const AddressEntry = types
  .model('AddressEntry', {
    id: types.optional(types.identifierNumber, 0),
    type: types.optional(types.string, ''),
    address: types.optional(types.string, '')
  })
  .actions((self) => ({
    remove() {
      getRoot<typeof RootStore>(self).address.removeItem(self);
    },
    edit(type: string, address: string) {
      self.type = type;
      self.address = address;
    }
  }));

export type AddressModel = SnapshotOut<typeof AddressEntry>;

const AddressStore = types
  .model('', {
    items: types.array(AddressEntry),
    itemUsing: types.optional(AddressEntry, {})
  })
  .volatile(() => ({
    address: ''
  }))
  .actions((self) => ({
    setAddress(address: string) {
      self.address = address;
    },
    addNewItem(type: string, address: string) {
      const id = self.items.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
      self.items.push({ id, type, address });
    },
    removeItem(item: AddressModel) {
      destroy(item);
    },
    existAddress(address?: AddressModel) {
      return self.items.find((item) => item.id === address?.id);
    },
    setItemUsing(item: AddressModel) {
      applySnapshot(self, {
        ...self,
        itemUsing: item
      });
    }
  }))
  .views((self) => ({
    get addresses() {
      return toJS(self.items);
    }
  }));

export default AddressStore;
