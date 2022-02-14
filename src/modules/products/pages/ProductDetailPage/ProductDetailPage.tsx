import LoadingScreen from "#/components/LoadingScreen";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetProductBySlugQuery } from "@/redux/slices/product";
import {
  previewImageSelector,
  resetPreviewProduct,
  setViewingProduct,
} from "@/redux/slices/productView";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProductInformation from "../../components/ProductInformation/ProductInformation";
import QuantityControl from "../../components/QuantityControl";
import styles from "./ProductDetailPage.module.scss";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();

  const itemId = router.query.itemId as string;

  const { data: product, isLoading } = useGetProductBySlugQuery(itemId ?? "1");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !product) {
      router.push("/404").then();
    }
    if (!isLoading && product) {
      dispatch(setViewingProduct(product));
    }
    return () => {
      dispatch(resetPreviewProduct());
    };
  }, [router, dispatch, isLoading, product]);

  const previewProductImage = useAppSelector(previewImageSelector);

  if (isLoading || !product) {
    return <LoadingScreen />;
  }

  return (
    <DetailLayout
      title={product.title}
      themeColorCode={product.theme_color_code}
      previewImages={previewProductImage}
      footer={
        <div className={styles.productsDetailsPageContentFooter}>
          <Text.P size="large">{formatCurrency(product.price)}</Text.P>
          <QuantityControl />
        </div>
      }
    >
      <ProductInformation product={product} />
    </DetailLayout>
  );
};

export default ProductDetailPage;
