import LoadingScreen from "#/components/LoadingScreen";
import QuantityControl from "#/components/QuantityControl";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch } from "@/redux/hooks";
import { useGetComboByIdQuery } from "@/redux/slices/strapi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ComboInformation from "../../components/ComboInformation/ComboInformation";
import styles from "./ComboDetailPage.module.scss";

const ComboDetailPage: NextPage = () => {
  const router = useRouter();

  const comboId = router.query.comboId as string;

  const { data: combo, isLoading } = useGetComboByIdQuery(comboId ?? "1");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !combo) {
      router.replace("/404").then();
    }
  }, [router, dispatch, isLoading, combo]);

  if (isLoading || !combo) {
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

export default ComboDetailPage;
