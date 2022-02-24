import LoadingScreen from "#/components/LoadingScreen";
import QuantityControl from "#/components/QuantityControl";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import { Combo } from "#/types";
import { axiosInstance } from "#/utils/axios";
import { formatCurrency } from "#/utils/number";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import ComboInformation from "../../components/ComboInformation/ComboInformation";
import styles from "./ComboDetailPage.module.scss";

interface ComboDetailPageProps {
  combo: Combo;
}

export const ComboDetailPage: NextPage<ComboDetailPageProps> = ({ combo }) => {
  if (!combo) {
    return <LoadingScreen />;
  }

  return (
    <DetailLayout
      title={combo.name}
      themeColorCode={combo.theme_color_code}
      previewImages={combo.images}
      footer={
        <div className={styles.productsDetailsPageContentFooter}>
          <Text.P size="large">{formatCurrency(combo.price)}</Text.P>
          <QuantityControl cartSelection={{ type: "combo", combo }} />
        </div>
      }
    >
      <ComboInformation combo={combo} />
    </DetailLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ComboDetailPageProps
> = async (context) => {
  const comboId = context.params?.comboId;
  if (!comboId) {
    return {
      notFound: true,
    };
  }

  const { data: combo } = await axiosInstance.get<Combo>(`/combos/${comboId}`);

  return {
    props: {
      combo,
    },
  };
};
