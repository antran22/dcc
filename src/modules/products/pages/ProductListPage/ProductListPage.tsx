import {NextPage} from "next";
import Head from "next/head";
import React, {useContext} from "react";
import {ViewportDimensionContext} from "#/contexts/ViewportDimensionContext";
import {HEADER_HEIGHT} from "#/styles/constants";
import SingleProduct from "../../components/SingleProduct";
import styles from "./ProductListPage.module.scss";
import {useListProductsQuery} from "@/redux/slices/api";
import Text from "#/components/Text";
import Carousel from "#/components/Carousel";

const ProductListPage: NextPage = () => {
  const { height, currentMode } = useContext(ViewportDimensionContext);
  const { data: products, isLoading } = useListProductsQuery({
    limit: 20,
    start: 0,
  });

  const PAGINATION_HEIGHT = 100;
  const itemHeight = height - HEADER_HEIGHT - PAGINATION_HEIGHT;

  const showHoverState = currentMode !== "desktop";

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
            <SingleProduct
              key={product.slug}
              product={product}
              showDetails
              containerStyle={{ height: itemHeight }}
              showHoverState={showHoverState}
            />
          ))}
        </Carousel>
      )}
    </main>
  );
};

export default ProductListPage;
