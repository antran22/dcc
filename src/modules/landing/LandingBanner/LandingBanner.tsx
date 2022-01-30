import { useInterval } from "#/hooks";
import LandingSquares from "@/modules/landing/LandingSquares";
import c from "classnames";
import React, { useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import styles from "./LandingBanner.module.scss";

const titleFragment = [
  ["Đồ", "Chơi", "...", "Chữ"],
  ["Đồ", "...", "Chơi", "Chữ"],
  ["Đồ", "...", "Chơi", "Chữ"],
];

const subtitles = [
  "ĐỒ CHƠI LIÊN QUAN ĐẾN CHỮ",
  "CÁI ĐỒ CHƠI CHỮ",
  "ĐỒ VẬT DÙNG ĐỂ CHƠI CHỮ",
];

const LandingBanner: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useInterval(() => {
    setAnimationStep((animationStep + 1) % 3);
  }, 2000);

  return (
    <div className={styles.landingBanner}>
      <LandingSquares />

      <Flipper flipKey={animationStep}>
        <div className={styles.landingBannerTitle}>
          {titleFragment[animationStep].map((fragment) => (
            <Flipped key={fragment} flipId={fragment}>
              <span className={styles.landingBannerTitleSpan}>{fragment}</span>
            </Flipped>
          ))}
        </div>
      </Flipper>

      <div className={styles.landingBannerSubtitleContainer}>
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            className={c(
              styles.landingBannerSubtitle,
              index !== animationStep ? styles.landingBannerSubtitleHidden : ""
            )}
          >
            {subtitle}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingBanner;
