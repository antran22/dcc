import LoadingScreen from "#/components/LoadingScreen";
import QuantityControl from "#/components/QuantityControl";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import { Product } from "#/types";
import { axiosInstance } from "#/utils/axios";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentProductVariantSelector,
  previewImageSelector,
  resetPreviewProduct,
  setViewingProduct,
} from "@/redux/slices/productView";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import ProductInformation from "../../components/ProductInformation/ProductInformation";
import styles from "./ProductDetailPage.module.scss";

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  product,
}) => {
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
  const currentProductVariant = useAppSelector(currentProductVariantSelector);

  if (!product) {
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
          <QuantityControl cartSelection={currentProductVariant} />
        </div>
      }
    >
      <ProductInformation product={product} />
    </DetailLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ProductDetailPageProps
> = async (context) => {
  const itemId = context.params?.itemId;
  if (!itemId) {
    return {
      notFound: true,
    };
  }
  const { data: product } = await axiosInstance.get<Product>(
    `products/${itemId}`
  );

  return {
    props: {
      product,
    },
  };
};
