import LoadingScreen from "#/components/LoadingScreen";
import { getProductDetail, getProductList, Product } from "@/graphql/products";
import { ProductDetailPageTemplate } from "@/modules/products/components/ProductDetailPageTemplate";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import ComboInformation from "../../components/ComboInformation/ComboInformation";

interface ComboDetailPageProps {
  combo: Product;
}

export const ComboDetailPage: NextPage<ComboDetailPageProps> = ({ combo }) => {
  if (!combo) {
    return <LoadingScreen />;
  }

  return (
    <ProductDetailPageTemplate product={combo}>
      <ComboInformation combo={combo} />
    </ProductDetailPageTemplate>
  );
};

export const getStaticProps: GetStaticProps<ComboDetailPageProps> = async (
  context
) => {
  const comboSlug = context.params?.productSlug;
  if (!comboSlug) {
    return {
      notFound: true,
    };
  }

  const combo = await getProductDetail(comboSlug as string);

  if (!combo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      combo,
    },
    revalidate: 900,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const combos = await getProductList("combo");
  const pathsWithComboSlug = combos.map((combo) => ({
    params: { comboSlug: combo.slug },
  }));
  return {
    paths: pathsWithComboSlug,
    fallback: true,
  };
};
