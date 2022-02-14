import {
  initialProductViewState,
  productViewSlice,
} from "@/redux/slices/productView";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
// @ts-ignore
import expireReducer from "redux-persist-expire";
import storage from "redux-persist/lib/storage";
import { cartSlice, initialCartState } from "./slices/cart";
import { strapiAPI } from "./slices/strapi";
const reducers = combineReducers({
  cart: cartSlice.reducer,
  productView: productViewSlice.reducer,
  [strapiAPI.reducerPath]: strapiAPI.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "dcc",
    storage,
    blacklist: [strapiAPI.reducerPath],
    transforms: [
      expireReducer("cart", {
        expireSeconds: 3600,
        autoExpire: true,
        expiredState: initialCartState,
      }),
      expireReducer("productView", {
        expireSeconds: 3600,
        autoExpire: true,
        expiredState: initialProductViewState,
      }),
    ],
  },
  reducers
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(strapiAPI.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
