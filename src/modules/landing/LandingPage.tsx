import ButtonLink from "#/components/Button/ButtonLink";
import { NextPage } from "next";
import React from "react";
import LandingBanner from "./LandingBanner";
import styles from "./LandingPage.module.scss";

const LandingPage: NextPage = () => {
  return (
    <main className={styles["landing-page"]}>
      <LandingBanner />

      <ButtonLink
        color="nude"
        classNames={[styles["landing-page-cta"]]}
        href="/products"
      >
        KHÁM PHÁ CỬA HÀNG
      </ButtonLink>
    </main>
  );
};

export default LandingPage;
