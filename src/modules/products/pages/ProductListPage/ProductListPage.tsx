import { NextPage } from "next";
import Head from "next/head";
import React, { useContext } from "react";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import SingleProduct from "../../components/SingleProduct";
import styles from "./ProductListPage.module.scss";
import { useListProductsQuery } from "@/redux/slices/api";
import Text from "#/components/Text";
import Carousel from "#/components/Carousel";

const ProductListPage: NextPage = () => {
  const { data: products, isLoading } = useListProductsQuery({
    limit: 20,
    start: 0,
  });

  const { currentMode } = useContext(ViewportDimensionContext);

  return (
    <main className={styles["products-list-page"]}>
      <Head>
        <title>Sản Phẩm Lẻ</title>
      </Head>
      {isLoading || !products ? (
        <Text.P>Loading</Text.P>
      ) : (
        <Carousel
          slidesToShow={currentMode === "desktop" ? 3 : 1}
          slidesToScroll={1}
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
