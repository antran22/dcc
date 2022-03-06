import { getProductDetail, Product } from "@/graphql/products";
import { ProductDetailPageTemplate } from "../../components/ProductDetailPageTemplate";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import ProductInformation from "../../components/ProductInformation/ProductInformation";

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  product,
}) => {
  return (
    <ProductDetailPageTemplate product={product}>
      <ProductInformation product={product} />
    </ProductDetailPageTemplate>
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
