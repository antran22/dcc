import PlainLayout from "#/layout/PlainLayout";
import MainContent from "@/modules/about/MainContent";
import { NextPage } from "next";
import React from "react";
import styles from "./AboutPage.module.scss";

const AboutPage: NextPage = () => {
  return (
    <PlainLayout title="Về chúng tôi">
      <div className={styles.aboutPage}>
        <aside className={styles.leftBanner} />
        <MainContent />
      </div>
    </PlainLayout>
  );
};

export default AboutPage;
