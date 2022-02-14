import ListingLayout from "#/layout/ListingLayout";
import SingleCombo from "../../components/SingleCombo";
import { useListCombosQuery } from "@/redux/slices/strapi";
import { NextPage } from "next";
import React from "react";

const ComboListPage: NextPage = () => {
  const { data: combos, isLoading } = useListCombosQuery({
    limit: 20,
    start: 0,
  });

  return (
    <ListingLayout title="Gói quà">
      {!isLoading &&
        combos &&
        combos.map((combo) => <SingleCombo key={combo.slug} combo={combo} />)}
    </ListingLayout>
  );
};

export default ComboListPage;
