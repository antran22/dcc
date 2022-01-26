import { CartItem, ProductVariant, sameProductVariant } from "@/shared/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addVariantToCart: (state, action: PayloadAction<ProductVariant>) => {
      const item = state.find((item) =>
        sameProductVariant(item.productVariant, action.payload)
      );
      if (item) {
        item.quantity++;
      } else {
        state.push({
          quantity: 1,
          productVariant: action.payload,
        });
      }
    },
    reduceVariantFromCart: (state, action: PayloadAction<ProductVariant>) => {
      const item = state.find((item) =>
        sameProductVariant(item.productVariant, action.payload)
      );
      if (item && item.quantity > 0) {
        if (item.quantity === 1) {
          return state.filter(
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
      const item = state.find((item) =>
        sameProductVariant(item.productVariant, action.payload.productVariant)
      );
      if (item) {
        if (action.payload.newQuantity === 0) {
          return state.filter((_item) =>
            sameProductVariant(_item.productVariant, item.productVariant)
          );
        } else {
          item.quantity = action.payload.newQuantity;
        }
      }
    },

    deleteVariantFromCart: (state, action: PayloadAction<ProductVariant>) => {
      const itemIndex = state.findIndex((item) =>
        sameProductVariant(item.productVariant, action.payload)
      );
      if (itemIndex > -1) {
        state.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  addVariantToCart,
  deleteVariantFromCart,
  reduceVariantFromCart,
  setVariantQuantity,
} = cartSlice.actions;

// Selectors
export const cartSelector = (state: RootState) => state.cart;
export const cartSumSelector = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.productVariant.product.price * item.quantity;
  }, 0);
});

export const cartAmountSelector = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

export const getCartItemSelector = (variant?: ProductVariant) =>
  createSelector([cartSelector], (cart) => {
    if (!variant) {
      return undefined;
    }
    return cart.find((item) =>
      sameProductVariant(item.productVariant, variant)
    );
  });
