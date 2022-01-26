import Divider from "#/components/Divider";
import {assets} from "@/assets";
import Image from "next/image";
import React from "react";
import SectionFour from "../SectionFour";
import SectionOne from "../SectionOne";
import SectionThree from "../SectionThree";
import SectionTwo from "../SectionTwo";
import styles from "./MainContent.module.scss";

const MainContent: React.FC = () => {
  return (
    <main className={styles["about-page-main-content"]}>
      <div className={styles["about-page-main-content-title"]}>
        <Image src={assets.aboutTitle} alt="Cau Chuyen" layout="responsive" />
      </div>
      <Divider classNames={[styles["about-page-main-content-divider"]]} />

      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </main>
  );
};

export default MainContent;
