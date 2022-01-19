import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './slices/cart';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cmsAPI } from './slices/api';
import { setupListeners } from '@reduxjs/toolkit/query';

const persistConfig = {
  key: 'dcc',
  storage,
};

const reducers = combineReducers({
  cart: cartSlice.reducer,
  [cmsAPI.reducerPath]: cmsAPI.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cmsAPI.middleware),
});

setupListeners(store.dispatch);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
