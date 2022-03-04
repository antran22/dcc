import LoadingScreen from "#/components/LoadingScreen";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import {
  getPriceStringFromProduct,
  getProductAttributeMap,
  getProductDetail,
  SingleProductDetail,
} from "@/graphql/products";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentProductVariantSelector,
  previewImageSelector,
  resetPreviewProduct,
  setViewingProduct,
} from "@/redux/slices/productView";
import _ from "lodash";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import ProductInformation from "../../components/ProductInformation/ProductInformation";
import styles from "./ProductDetailPage.module.scss";

interface ProductDetailPageProps {
  product: SingleProductDetail;
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
          {/*<QuantityControl cartSelection={currentProductVariant} />*/}
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
  const productSlug = context.params?.productSlug;
  if (!productSlug) {
    return {
      notFound: true,
    };
  }

  const product = await getProductDetail(productSlug as string);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
