// @ts-ignore
import sync from "css-animation-sync";
import React, { useEffect } from "react";
import styles from "./LandingSquares.module.scss";

const LandingSquares: React.FC = () => {
  useEffect(() => {
    sync(
      "landing-square-1",
      "landing-square-2",
      "landing-square-3",
      "landing-square-4",
      "landing-square-5"
    );
  }, []);

  return (
    <div className={styles.landingSquareContainer}>
      <div className={styles.landingSquare1} />
      <div className={styles.landingSquare2} />
      <div className={styles.landingSquare3} />
      <div className={styles.landingSquare4} />
      <div className={styles.landingSquare5} />
    </div>
  );
};

export default LandingSquares;
