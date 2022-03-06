import LoadingScreen from "#/components/LoadingScreen";
import { getProductDetail, Product } from "@/graphql/products";
import { ProductDetailPageTemplate } from "@/modules/products/components/ProductDetailPageTemplate";
import { GetServerSideProps, NextPage } from "next";
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

export const getServerSideProps: GetServerSideProps<
  ComboDetailPageProps
> = async (context) => {
  const comboSlug = context.params?.comboSlug;
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
  };
};
