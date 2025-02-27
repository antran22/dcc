import c from "classnames";
import React from "react";
import styles from "./Divider.module.scss";

interface DividerProps {
  classNames?: string[];
}

const Divider: React.FC<DividerProps> = ({ classNames = [] }: DividerProps) => {
  return <div className={c(styles.divider, ...classNames)} />;
};

export default Divider;
