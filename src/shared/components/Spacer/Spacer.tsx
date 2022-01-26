import c from "classnames";
import React from "react";
import styles from "./Spacer.module.scss";

interface SpacerProps {
  size?: "normal" | "small" | "big";
}
const Spacer: React.FC<SpacerProps> = ({ size = "normal" }) => {
  return <span className={c(styles["spacer"], styles[`spacer-${size}`])} />;
};

export default Spacer;
