import Carousel from "#/components/Carousel";
import LoadingScreen from "#/components/LoadingScreen";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import { useListProductsQuery } from "@/redux/slices/product";
import { NextPage } from "next";
import Head from "next/head";
import React, { useContext } from "react";
import SingleProduct from "../../components/SingleProduct";
import styles from "./ProductListPage.module.scss";

const ProductListPage: NextPage = () => {
  const { data: products, isLoading } = useListProductsQuery({
    limit: 20,
    start: 0,
  });

  const { currentMode } = useContext(ViewportDimensionContext);

  return (
    <main className={styles.productsListPage}>
      <Head>
        <title>Sản Phẩm Lẻ</title>
      </Head>

      {isLoading || !products ? (
        <LoadingScreen />
      ) : (
        <Carousel
          slidesToShow={currentMode === "desktop" ? 3 : 1}
          slidesToScroll={1}
          autoplay
        >
          {products.map((product) => (
            <SingleProduct key={product.slug} product={product} />
          ))}
        </Carousel>
      )}
    </main>
  );
};

export default ProductListPage;
