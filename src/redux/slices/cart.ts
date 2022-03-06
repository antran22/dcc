import { CartItem, ProductSelection, ProductSelectionBrowse } from "#/types";
import {
  getProductCrossSellIds,
  getProductVariantPrice,
} from "@/graphql/products";
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
  selection: ProductSelection
): CartItem | undefined {
  return items.find(
    (item) => item && item.selection.variant.id === selection.variant.id
  );
}

function cartItemListWithoutSelection(
  items: CartItem[],
  selection: ProductSelection
): CartItem[] {
  return items.filter(
    (_item) => selection.variant.id !== _item.selection.variant.id
  );
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.hasAlreadyCrossSold = false;
    },

    addSelectionToCart: (state, action: PayloadAction<ProductSelection>) => {
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

    reduceSelectionFromCart: (
      state,
      action: PayloadAction<ProductSelection>
    ) => {
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
        selection: ProductSelection;
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

    deleteSelectionFromCart: (
      state,
      action: PayloadAction<ProductSelection>
    ) => {
      state.items = cartItemListWithoutSelection(state.items, action.payload);
    },

    visitCrossSellPage: (state) => {
      state.hasAlreadyCrossSold = false;
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
    return (
      total + getProductVariantPrice(item.selection.variant) * item.quantity
    );
  }, 0);
});

export const cartAmountSelector = createSelector([cartSelector], (state) => {
  return state.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

export const crossSellProductIdsSelector = createSelector(
  [cartSelector],
  (state) => {
    const allProductIdInCart = state.items.flatMap(
      (item) => item.selection.product.id
    );

    const allBrowseProductSelections = state.items
      .map((item) => item.selection)
      .filter(
        (selection): selection is ProductSelectionBrowse =>
          selection.type === "browse"
      );

    const allCrossSellProductIds = allBrowseProductSelections.flatMap(
      (selection) => getProductCrossSellIds(selection.product)
    );

    const uniqueCrossSellProductIds = _.uniq(allCrossSellProductIds);

    return uniqueCrossSellProductIds.filter(
      (productId) => !allProductIdInCart.includes(productId)
    );
  }
);

export const hasCrossSoldSelector = createSelector([cartSelector], (state) => {
  return state.hasAlreadyCrossSold;
});

export const getCartItemSelector = (selection?: ProductSelection) =>
  createSelector([cartSelector], (state) => {
    if (!selection) {
      return undefined;
    }
    return findCartItemWithSelection(state.items, selection);
  });
