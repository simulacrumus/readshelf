import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import setAuthToken from './utils/setAuthToken';
import rootReducer from './reducers/index'

const persistConfig = {
  key: 'root',
  storage: storage
}

const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configStore = () => {
  let store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
  let currentState = store.getState();

  store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();
    if (currentState.auth.token && previousState.auth.token !== currentState.auth.token) {
      const token = currentState.auth.token;
      setAuthToken(token);
    }
  });
  
  let persistor = persistStore(store)
  return { store, persistor }
}