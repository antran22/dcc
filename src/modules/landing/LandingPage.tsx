import ButtonLink from "#/components/Button/ButtonLink";
import PlainLayout from "#/layout/PlainLayout";
import { NextPage } from "next";
import React from "react";
import LandingBanner from "./LandingBanner";
import styles from "./LandingPage.module.scss";

const LandingPage: NextPage = () => {
  return (
    <PlainLayout title="Đồ Chơi Chữ">
      <main className={styles.landingPage}>
        <LandingBanner />

        <ButtonLink
          color="nude"
          classNames={[styles["landing-page-cta"]]}
          href="/products"
        >
          KHÁM PHÁ CỬA HÀNG
        </ButtonLink>
      </main>
    </PlainLayout>
  );
};

export default LandingPage;
