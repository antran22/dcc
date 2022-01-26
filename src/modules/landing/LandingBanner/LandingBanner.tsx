import {assets} from "@/assets";
import Image from "next/image";
import React from "react";
import LandingSquares from "../LandingSquares";
import styles from "./LandingBanner.module.scss";

const LandingBanner: React.FC = () => {
  return (
    <div className={styles["landing-banner"]}>
      <LandingSquares />
      <div className={styles["landing-banner-logo"]}>
        <Image src={assets.dccFullLong} alt="DCC TITLE" layout="responsive" />
      </div>
    </div>
  );
};

export default LandingBanner;
