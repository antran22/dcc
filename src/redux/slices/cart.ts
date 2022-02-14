import {
  CartItem,
  CartSelection,
  getSelectionCrossSell,
  getSelectionPrice,
  getSelectionProductIds,
  isEqualSelection,
} from "#/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../store";

interface CartState {
  items: CartItem[];
  hasAlreadyCrossSold: boolean;
}
export const initialCartState: CartState = {
  items: [],
  hasAlreadyCrossSold: false,
};

function findCartItemWithSelection(
  items: CartItem[],
  selection: CartSelection
): CartItem | undefined {
  return items.find(
    (item) => item && isEqualSelection(item.selection, selection)
  );
}

function cartItemListWithoutSelection(
  items: CartItem[],
  selection: CartSelection
): CartItem[] {
  return items.filter((_item) => !isEqualSelection(selection, _item.selection));
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.hasAlreadyCrossSold = false;
    },

    addSelectionToCart: (state, action: PayloadAction<CartSelection>) => {
      const item = findCartItemWithSelection(state.items, action.payload);

      if (item) {
        item.quantity++;
      } else {
        state.items.push({
          quantity: 1,
          selection: action.payload,
        });
      }
    },

    reduceSelectionFromCart: (state, action: PayloadAction<CartSelection>) => {
      const item = findCartItemWithSelection(state.items, action.payload);

      if (item && item.quantity > 0) {
        if (item.quantity === 1) {
          state.items = cartItemListWithoutSelection(
            state.items,
            item.selection
          );
        } else {
          item.quantity--;
        }
      }
    },

    setSelectionQuantity: (
      state,
      action: PayloadAction<{
        selection: CartSelection;
        newQuantity: number;
      }>
    ) => {
      const item = findCartItemWithSelection(
        state.items,
        action.payload.selection
      );

      if (item) {
        if (action.payload.newQuantity === 0) {
          state.items = cartItemListWithoutSelection(
            state.items,
            item.selection
          );
        } else {
          item.quantity = action.payload.newQuantity;
        }
      }
    },

    deleteSelectionFromCart: (state, action: PayloadAction<CartSelection>) => {
      state.items = cartItemListWithoutSelection(state.items, action.payload);
    },

    visitCrossSellPage: (state) => {
      state.hasAlreadyCrossSold = true;
    },
  },
});

export const {
  clearCart,
  visitCrossSellPage,
  addSelectionToCart,
  deleteSelectionFromCart,
  reduceSelectionFromCart,
  setSelectionQuantity,
} = cartSlice.actions;

// Selectors
export const cartSelector = (state: RootState) => state.cart;

export const cartItemsSelector = (state: RootState) => state.cart.items;

export const cartSumSelector = createSelector([cartSelector], (state) => {
  return state.items.reduce((total, item) => {
    return total + getSelectionPrice(item.selection) * item.quantity;
  }, 0);
});

export const cartAmountSelector = createSelector([cartSelector], (state) => {
  return state.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

export const crossSellProductSelector = createSelector(
  [cartSelector],
  (state) => {
    const allProductIdInCart = state.items.flatMap((item) =>
      getSelectionProductIds(item.selection)
    );

    const allCrossSellProducts = state.items.flatMap((item) =>
      getSelectionCrossSell(item.selection)
    );

    const filteredCrossSellProducts = allCrossSellProducts.filter(
      (product) => product && !allProductIdInCart.includes(product.id)
    );

    return _.uniqBy(filteredCrossSellProducts, (product) => product.id);
  }
);

export const hasCrossSoldSelector = createSelector([cartSelector], (state) => {
  return state.hasAlreadyCrossSold;
});

export const getCartItemSelector = (selection?: CartSelection) =>
  createSelector([cartSelector], (state) => {
    if (!selection) {
      return undefined;
    }
    return findCartItemWithSelection(state.items, selection);
  });
