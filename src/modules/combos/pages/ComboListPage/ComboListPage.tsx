import ListingLayout from "#/layout/ListingLayout";
import { Combo } from "#/types";
import { axiosInstance } from "#/utils/axios";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import SingleCombo from "../../components/SingleCombo";

interface ComboListPageProps {
  combos: Combo[];
}
export const ComboListPage: NextPage<ComboListPageProps> = ({ combos }) => {
  return (
    <ListingLayout title="Gói quà">
      {combos &&
        combos.map((combo) => <SingleCombo key={combo.slug} combo={combo} />)}
    </ListingLayout>
  );
};

export const getStaticProps: GetStaticProps<ComboListPageProps> = async () => {
  const { data: combos } = await axiosInstance.get<Combo[]>("/combos");
  return {
    props: {
      combos,
    },
    revalidate: 60,
  };
};
