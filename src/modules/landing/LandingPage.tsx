import Button from "#/components/Button";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import LandingBanner from "./LandingBanner";
import styles from "./LandingPage.module.scss";

const LandingPage: NextPage = () => {
  const router = useRouter();
  return (
    <main className={styles["landing-page"]}>
      <LandingBanner />
      <div className={styles["landing-page-title"]}>
        <p>Cái đồ chơi chữ</p>
      </div>
      <Button
        color="nude"
        classNames={[styles["landing-page-cta"]]}
        onClick={() => {
          router.push("/products");
        }}
      >
        Khám phá cửa hàng
      </Button>
    </main>
  );
};

export default LandingPage;
