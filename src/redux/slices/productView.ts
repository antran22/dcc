import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Product,
  ProductColor,
  ProductSize,
  StrapiImage,
} from "@/redux/apiTypes";

interface ProductViewState {
  product?: Product;
  previewImages: StrapiImage[];
  selectedColor?: ProductColor;
  selectedSize?: ProductSize;
}

const initialState: ProductViewState = {
  previewImages: [],
};

export const productViewSlice = createSlice({
  name: "productView",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.previewImages = action.payload.thumbnails;
      state.selectedColor = undefined;
      state.selectedSize = undefined;
    },

    setPreviewImages: (state, action: PayloadAction<StrapiImage[]>) => {
      state.previewImages = action.payload;
    },

    resetPreviewImages: (state) => {
      if (state.selectedColor) {
        state.previewImages = state.selectedColor.images;
      } else {
        state.previewImages = state.product?.thumbnails ?? [];
      }
    },

    selectColor: (state, action: PayloadAction<ProductColor>) => {
      state.selectedColor = action.payload;
    },

    unselectColor: (state) => {
      state.selectedColor = undefined;
    },

    selectSize: (state, action: PayloadAction<ProductSize>) => {
      state.selectedSize = action.payload;
    },

    unselectSize: (state) => {
      state.selectedSize = undefined;
    },

    resetProduct: (state) => {
      state.product = undefined;
      state.selectedColor = undefined;
      state.selectedSize = undefined;
      state.previewImages = [];
    },
  },
});

export const {
  setProduct,
  selectColor,
  selectSize,
  setPreviewImages,
  resetPreviewImages,
  resetProduct,
  unselectColor,
  unselectSize,
} = productViewSlice.actions;

export const productViewSelector = (state: RootState) => state.productView;

export const previewImageSelector = createSelector(
  [productViewSelector],
  (productView) => {
    return productView.previewImages;
  }
);

export const currentColorSelector = createSelector(
  [productViewSelector],
  (productView) => {
    return productView.selectedColor;
  }
);

export const currentSizeSelector = createSelector(
  [productViewSelector],
  (productView) => {
    return productView.selectedSize;
  }
);
