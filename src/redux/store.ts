import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cartSlice} from "./slices/cart";
import {cmsAPI} from "./slices/api";
import {setupListeners} from "@reduxjs/toolkit/query";
import {productViewSlice} from "@/redux/slices/productView";

const reducers = combineReducers({
  cart: cartSlice.reducer,
  productView: productViewSlice.reducer,
  [cmsAPI.reducerPath]: cmsAPI.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cmsAPI.middleware),
});

setupListeners(store.dispatch);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
