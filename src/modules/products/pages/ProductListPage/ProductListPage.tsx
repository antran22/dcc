import ListingLayout from "#/layout/ListingLayout";
import { Product, ProductListing, stripDownProductForListing } from "#/types";
import { axiosInstance } from "#/utils/axios";
import SingleProduct from "@/modules/products/components/SingleProduct";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface ProductListPageProps {
  products: ProductListing[];
}

export const ProductListPage: NextPage<ProductListPageProps> = ({
  products,
}) => {
  return (
    <ListingLayout title="Sản Phẩm Lẻ">
      {products.map((product) => (
        <SingleProduct key={product.slug} product={product} />
      ))}
    </ListingLayout>
  );
};

export const getStaticProps: GetStaticProps<
  ProductListPageProps
> = async () => {
  const { data: products } = await axiosInstance.get<Product[]>("/products");
  const strippedDownProducts = products.map(stripDownProductForListing);
  return {
    props: {
      products: strippedDownProducts,
    },
    revalidate: 60,
  };
};
