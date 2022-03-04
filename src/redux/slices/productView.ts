import {
  AttributeValue,
  getVariantByColorAndSize,
  ProductMedia,
  ProductVariant,
  SingleProductDetail,
} from "@/graphql/products/getProductDetail";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductViewState {
  product?: SingleProductDetail;
  selectedColor?: AttributeValue;
  selectedSize?: AttributeValue;
}

export const initialProductViewState: ProductViewState = {};

export const productViewSlice = createSlice({
  name: "productView",
  initialState: initialProductViewState,
  reducers: {
    setViewingProduct: (state, action: PayloadAction<SingleProductDetail>) => {
      state.product = action.payload;
      state.selectedColor = undefined;
      state.selectedSize = undefined;
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

export const currentProductVariantSelector = createSelector(
  [productViewSelector],
  ({ product, selectedColor, selectedSize }): ProductVariant | undefined => {
    if (!product || !selectedColor || !selectedSize) {
      return undefined;
    }
    return getVariantByColorAndSize(product, selectedColor, selectedSize);
  }
);
