import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage: storage,
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
const DataProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

export default DataProvider;
