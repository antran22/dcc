import LoadingScreen from "#/components/LoadingScreen";
import Text from "#/components/Text";
import { formatCurrency } from "#/utils/number";
import ProductPreview from "@/modules/products/pages/ProductDetailPage/ProductPreview";
import { useAppDispatch } from "@/redux/hooks";
import { useGetProductBySlugQuery } from "@/redux/slices/product";
import { resetProduct, setProduct } from "@/redux/slices/productView";
import c from "classnames";
import { NextPage } from "next";
import Head from "next/head";
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
      dispatch(setProduct(product));
    }
    return () => {
      dispatch(resetProduct());
    };
  }, [router, dispatch, isLoading, product]);

  if (isLoading || !product) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.productsDetailsPage}>
      <Head>
        <title>{product.title}</title>
      </Head>

      <aside
        className={styles.productsDetailsPagePreview}
        style={{ backgroundColor: product.theme_color_code }}
      >
        <ProductPreview />
      </aside>

      <main className={styles.productsDetailsPageContent}>
        <h1
          className={c(styles.productsDetailsPageContentTitle)}
          style={{ fontSize: 60 }}
        >
          {product.title}
        </h1>

        <ProductInformation product={product} />

        <div className={styles.productsDetailsPageContentFooter}>
          <Text.P size="large">{formatCurrency(product.price)}</Text.P>
          <QuantityControl />
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
