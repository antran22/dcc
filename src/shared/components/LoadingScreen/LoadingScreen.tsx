import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen: React.FC = ({}) => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}>
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default LoadingScreen;
