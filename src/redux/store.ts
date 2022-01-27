import {productViewSlice} from "@/redux/slices/productView";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {productAPI} from "./slices/product";
import {cartSlice} from "./slices/cart";

const reducers = combineReducers({
  cart: cartSlice.reducer,
  productView: productViewSlice.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});

setupListeners(store.dispatch);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
