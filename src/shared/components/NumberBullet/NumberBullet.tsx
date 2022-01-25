import React from "react";
import Text from "../Text";
import styles from "./NumberBullet.module.scss";

interface NumberBulletProps {
  title: number;
}

const NumberBullet: React.FC<NumberBulletProps> = ({ title }) => {
  return (
    <div className={styles["number-bullet"]}>
      <Text.P thickness="thin">{String(title)}</Text.P>
    </div>
  );
};

export default NumberBullet;
