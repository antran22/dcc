import {
  Product,
  ProductColor,
  ProductSize,
  ProductVariant,
  StrapiImage,
} from "@/shared/types/";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  (productViewState) => {
    return productViewState.previewImages;
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
  (productViewState): ProductVariant | undefined => {
    if (!productViewState.product) {
      return undefined;
    }

    if (
      productViewState.product.colors.length > 0 &&
      !productViewState.selectedColor
    ) {
      return undefined;
    }

    if (
      productViewState.product.sizes.length > 0 &&
      !productViewState.selectedSize
    ) {
      return undefined;
    }

    return {
      product: productViewState.product,
      color: productViewState.selectedColor,
      size: productViewState.selectedSize,
    };
  }
);
