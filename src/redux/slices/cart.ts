import {createSelector, createSlice} from "@reduxjs/toolkit";
import {CartItem} from "@/shared/types";
import {RootState} from "../store";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 0) {
        if (item.quantity === 1) {
          return state.filter((_item) => _item.id !== item.id);
        } else {
          item.quantity--;
        }
      }
    },
    setQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity === 0) {
          return state.filter((_item) => _item.id !== item.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },

    deleteItem: (state, action) => {
      const itemIndex = state.findIndex((item) => (item.id = action.payload));
      if (itemIndex > -1) {
        state.splice(itemIndex, 1);
      }
    },
  },
});

export const { addItem, removeItem, deleteItem, setQuantity } =
  cartSlice.actions;

// Selectors
export const cartSelector = (state: RootState) => state.cart;
export const cartSumSelector = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});
export const cartAmountSelector = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});
