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
      if (item && item.quantity > 0) {
        if (item.quantity === 1) {
          state.filter((_item) => _item.id !== item.id);
        } else {
          item.quantity--;
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

export const { addItem, removeItem, deleteItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export const cartAmountSelector = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});
