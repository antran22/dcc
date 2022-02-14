import ListingLayout from "#/layout/ListingLayout/ListingLayout";
import SingleProduct from "@/modules/products/components/SingleProduct";
import { useListProductsQuery } from "@/redux/slices/product";
import { NextPage } from "next";
import React from "react";

const ProductListPage: NextPage = () => {
  const { data: products, isLoading } = useListProductsQuery({
    limit: 20,
    start: 0,
  });

  return (
    <ListingLayout title="Sản Phẩm Lẻ">
      {!isLoading &&
        products &&
        products.map((product) => (
          <SingleProduct key={product.slug} product={product} />
        ))}
    </ListingLayout>
  );
};

export default ProductListPage;
