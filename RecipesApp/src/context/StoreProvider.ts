import { useContext, createContext } from 'react';
import { RootStoreModel } from 'store/store';

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
