import { getProductList, ProductListItem } from "@/graphql/products";
import { ProductListPageTemplate } from "../../components/ProductListPageTemplate";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface ProductListPageProps {
  products: ProductListItem[];
}
export const ProductListPage: NextPage<ProductListPageProps> = ({
  products,
}) => {
  return (
    <ProductListPageTemplate
      products={products}
      title="Sản phẩm lẻ"
      hrefFolder="products"
    />
  );
};

export const getStaticProps: GetStaticProps<
  ProductListPageProps
> = async () => {
  const products = await getProductList("single-product");

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
