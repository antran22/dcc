import ListingLayout from "#/layout/ListingLayout";
import {
  getPriceStringFromProduct,
  getProductAttributeMap,
  getProductList,
  ProductListItem,
} from "@/graphql/products";
import ProductCard from "@/modules/products/components/ProductCard";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface ProductListPageProps {
  products: ProductListItem[];
}

export const ProductListPage: NextPage<ProductListPageProps> = ({
  products,
}) => {
  return (
    <ListingLayout title="Sản Phẩm Lẻ">
      {products.map((productListItem) => {
        const firstImage = productListItem.media?.at(0);
        const productAttributes = getProductAttributeMap(productListItem);
        const price = getPriceStringFromProduct(productListItem);
        const themeColorCode =
          productAttributes["theme-color"][0].value ?? undefined;

        return (
          <ProductCard
            key={productListItem.slug}
            slug={productListItem.slug}
            name={productListItem.name}
            price={price}
            imageUrl={firstImage?.url}
            imageAlt={firstImage?.alt}
            themeColorCode={themeColorCode}
          />
        );
      })}
    </ListingLayout>
  );
};

export const getStaticProps: GetStaticProps<
  ProductListPageProps
> = async () => {
  const products = await getProductList();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
