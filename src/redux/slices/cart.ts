import { CartItem, ProductVariant, sameProductVariant } from "#/types";
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

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.hasAlreadyCrossSold = false;
    },

    addVariantToCart: (state, action: PayloadAction<ProductVariant>) => {
      const item = state.items.find((item) =>
        sameProductVariant(item.productVariant, action.payload)
      );
      if (item) {
        item.quantity++;
      } else {
        state.items.push({
          quantity: 1,
          productVariant: action.payload,
        });
      }
    },

    reduceVariantFromCart: (state, action: PayloadAction<ProductVariant>) => {
      const item = state.items.find((item) =>
        sameProductVariant(item.productVariant, action.payload)
      );
      if (item && item.quantity > 0) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (_item) =>
              !sameProductVariant(item.productVariant, _item.productVariant)
          );
        } else {
          item.quantity--;
        }
      }
    },
    setVariantQuantity: (
      state,
      action: PayloadAction<{
        productVariant: ProductVariant;
        newQuantity: number;
      }>
    ) => {
      const item = state.items.find((item) =>
        sameProductVariant(item.productVariant, action.payload.productVariant)
      );
      if (item) {
        if (action.payload.newQuantity === 0) {
          state.items = state.items.filter((_item) =>
            sameProductVariant(_item.productVariant, item.productVariant)
          );
        } else {
          item.quantity = action.payload.newQuantity;
        }
      }
    },

    deleteVariantFromCart: (state, action: PayloadAction<ProductVariant>) => {
      const itemIndex = state.items.findIndex((item) =>
        sameProductVariant(item.productVariant, action.payload)
      );
      if (itemIndex > -1) {
        state.items.splice(itemIndex, 1);
      }
    },

    visitCrossSellPage: (state) => {
      state.hasAlreadyCrossSold = true;
    },
  },
});

export const {
  clearCart,
  visitCrossSellPage,
  addVariantToCart,
  deleteVariantFromCart,
  reduceVariantFromCart,
  setVariantQuantity,
} = cartSlice.actions;

// Selectors
export const cartSelector = (state: RootState) => state.cart;

export const cartItemsSelector = (state: RootState) => state.cart.items;

export const cartSumSelector = createSelector([cartSelector], (state) => {
  return state.items.reduce((total, item) => {
    return total + item.productVariant.product.price * item.quantity;
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
    const allProductIdInCart = state.items.map(
      (item) => item.productVariant.product.id
    );

    const allCrossSellProducts = state.items.flatMap(
      (item) => item.productVariant.product.cross_sell
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

export const getCartItemSelector = (variant?: ProductVariant) =>
  createSelector([cartSelector], (state) => {
    if (!variant) {
      return undefined;
    }
    return state.items.find((item) =>
      sameProductVariant(item.productVariant, variant)
    );
  });
