import { getProductList, ProductListItem } from "@/graphql/products";
import { ProductListPageTemplate } from "@/modules/products/components/ProductListPageTemplate";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface ComboListPageProps {
  combos: ProductListItem[];
}
export const ComboListPage: NextPage<ComboListPageProps> = ({ combos }) => {
  return (
    <ProductListPageTemplate
      products={combos}
      title="Gói quà"
      hrefFolder="combos"
    />
  );
};

export const getStaticProps: GetStaticProps<ComboListPageProps> = async () => {
  const combos = await getProductList("combo");
  return {
    props: {
      combos,
    },
    revalidate: 60,
  };
};
