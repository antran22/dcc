import LoadingScreen from "#/components/LoadingScreen";
import QuantityControl from "#/components/QuantityControl";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import {
  getPriceStringFromProduct,
  getProductAttributeMap,
  Product,
} from "@/graphql/products";
import styles from "@/modules/products/pages/ProductDetailPage/ProductDetailPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  previewImageSelector,
  resetPreviewProduct,
  setViewingProduct,
} from "@/redux/slices/productView";
import _ from "lodash";
import { NextPage } from "next";
import React, { useEffect } from "react";

interface ProductDetailPageTemplateProps {
  product: Product;
}

export const ProductDetailPageTemplate: NextPage<
  ProductDetailPageTemplateProps
> = ({ product, children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) {
      dispatch(setViewingProduct(product));
    }
    return () => {
      dispatch(resetPreviewProduct());
    };
  }, [dispatch, product]);

  const previewProductImage = useAppSelector(previewImageSelector);

  if (!product) {
    return <LoadingScreen />;
  }

  const attributes = getProductAttributeMap(product);

  const color = _.first(attributes["theme-color"])?.value ?? "#ffffff";

  return (
    <DetailLayout
      title={product.name}
      themeColorCode={color}
      previewImages={previewProductImage}
      footer={
        <div className={styles.productsDetailsPageContentFooter}>
          <Text.P size="large">{getPriceStringFromProduct(product)}</Text.P>
          <QuantityControl />
        </div>
      }
    >
      {children}
    </DetailLayout>
  );
};
