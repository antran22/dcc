import { ProductSelection } from "#/types";
import {
  AttributeValue,
  getProductColors,
  getProductSizes,
  getVariantByColorAndSize,
  Product,
  ProductMedia,
} from "@/graphql/products";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductViewState {
  product?: Product;
  selectedColor?: AttributeValue;
  selectedSize?: AttributeValue;
}

export const initialProductViewState: ProductViewState = {};

export const productViewSlice = createSlice({
  name: "productView",
  initialState: initialProductViewState,
  reducers: {
    setViewingProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      const colors = getProductColors(action.payload);
      const sizes = getProductSizes(action.payload);
      state.selectedColor = undefined;
      state.selectedSize = undefined;
      if (colors.length === 1) {
        state.selectedColor = colors[0];
      }
      if (sizes.length === 1) {
        state.selectedSize = sizes[0];
      }
    },

    selectColor: (state, action: PayloadAction<AttributeValue>) => {
      state.selectedColor = action.payload;
    },

    unselectColor: (state) => {
      state.selectedColor = undefined;
    },

    selectSize: (state, action: PayloadAction<AttributeValue>) => {
      state.selectedSize = action.payload;
    },

    unselectSize: (state) => {
      state.selectedSize = undefined;
    },

    resetPreviewProduct: (state) => {
      state.product = undefined;
      state.selectedColor = undefined;
      state.selectedSize = undefined;
    },
  },
});

export const {
  setViewingProduct,
  selectColor,
  selectSize,
  resetPreviewProduct,
  unselectColor,
  unselectSize,
} = productViewSlice.actions;

export const productViewSelector = (state: RootState) => state.productView;

export const previewImageSelector = createSelector(
  [productViewSelector],
  ({ product, selectedColor, selectedSize }): ProductMedia[] => {
    if (selectedColor && selectedSize) {
      if (!product) {
        return [];
      }

      const variant = getVariantByColorAndSize(
        product,
        selectedColor,
        selectedSize
      );

      if (!variant) {
        return product.media ?? [];
      }

      return variant.media ?? [];
    }
    if (product) {
      return product.media ?? [];
    }
    return [];
  }
);

export const currentColorSelector = createSelector(
  [productViewSelector],
  (productViewState) => {
    return productViewState.selectedColor;
  }
);

export const currentSizeSelector = createSelector(
  [productViewSelector],
  (productViewState) => {
    return productViewState.selectedSize;
  }
);

export const currentProductSelectionSelector = createSelector(
  [productViewSelector],
  ({ product, selectedColor, selectedSize }): ProductSelection | undefined => {
    if (!product) {
      return undefined;
    }
    const variant = getVariantByColorAndSize(
      product,
      selectedColor,
      selectedSize
    );
    if (!variant) {
      return undefined;
    }
    return {
      product,
      variant,
      type: "browse",
    };
  }
);
