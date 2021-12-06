import { createSlice, createSelector } from '@reduxjs/toolkit';
import { CartItem } from '../../shared/types';
import { RootState } from '../store';

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
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
      const item = state.find((item) => (item.id = action.payload));
      // Keep item with 0 quantity and remove them from cart later during checkout
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export const cartAmountSelector = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});
