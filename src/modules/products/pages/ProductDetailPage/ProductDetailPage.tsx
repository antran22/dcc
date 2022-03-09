import { getProductDetail, getProductList, Product } from "@/graphql/products";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { ProductDetailPageTemplate } from "../../components/ProductDetailPageTemplate";
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

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async (
  context
) => {
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
    revalidate: 900,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProductList("single-product");
  const pathsWithProductSlug = products.map((product) => ({
    params: { productSlug: product.slug },
  }));
  return {
    paths: pathsWithProductSlug,
    fallback: true,
  };
};
