import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../shared/types';
import { RootState } from '../store';

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export const cartAmountSelector = (state: RootState) => state.cart.length;
